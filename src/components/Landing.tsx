import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              Tameem
              <br />
              <span>Akhtar</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>A MERN Stack</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Frontend</div>
              <div className="landing-h2-2">Backend</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Devloper</div>
              <div className="landing-h2-info-1">Devloper</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
