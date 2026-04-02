import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const resetFaceAndEyeState = (character: THREE.Object3D) => {
  character.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (!mesh.isMesh || !mesh.morphTargetInfluences) {
      return;
    }

    mesh.morphTargetInfluences = mesh.morphTargetInfluences.map(() => 0);
  });

  const eyeBoneCandidates = [
    "eye_L",
    "eye_R",
    "eyeball_L",
    "eyeball_R",
    "eyeball",
    "eyeL",
    "eyeR",
    "LeftEye",
    "RightEye",
  ];

  eyeBoneCandidates.forEach((name) => {
    const node = character.getObjectByName(name);
    if (node) {
      node.rotation.set(0, 0, 0);
      node.updateMatrixWorld(true);
    }
  });
};

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>((resolve, reject) => {
      decryptFile("/models/character.enc", "Character3D#@").then(
        (encryptedBlob) => {
          const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

          let character: THREE.Object3D;
          loader.load(
            blobUrl,
            async (gltf) => {
              character = gltf.scene;
              await renderer.compileAsync(character, camera, scene);
              resetFaceAndEyeState(character);
              character.traverse((child) => {
                const mesh = child as THREE.Mesh;
                if (mesh.isMesh) {
                  mesh.castShadow = true;
                  mesh.receiveShadow = true;
                  mesh.frustumCulled = true;
                }
              });
              resolve(gltf);
              setCharTimeline(character, camera);
              character!.getObjectByName("footR")!.position.y = 3.36;
              character!.getObjectByName("footL")!.position.y = 3.36;
              dracoLoader.dispose();
            },
            undefined,
            (error) => {
              console.error("Error loading GLTF model:", error);
              reject(error);
            }
          );
        }, reject);
    });
  };

  return { loadCharacter };
};

export default setCharacter;
