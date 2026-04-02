import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { useMemo, useState } from "react";

type Project = {
  name: string;
  category: string;
  toolsLabel: string;
  techStack: string;
  image: string;
  link?: string;
};

const Work = () => {
  const projects = useMemo<Project[]>(
    () => [
      {
        name: "Veltrix -AI Chatbot",
        category: "AI Chatbot",
        toolsLabel: "Tools and features",
        techStack: "Javascript, React, Node.js, Express.js, MongoDB, RAG, Generative AI",
        image: "/public/images/veltrix.png",
      },
      {
        name: "Cineverse ",
        category: "Movie  Platform",
        toolsLabel: "Tools and features",
        techStack: "Javascript, React, Threejs ,Node.js, Express.js, MongoDB,TMDB API,Threejs,",
        image: "/public/images/cineverse.png",
      },
      {
        name: "Moodify",
        category: "Mood Tracking App",
        toolsLabel: "Tools and features",
        techStack: "Javascript, , React, Node.js, Express.js, MongoDB, MediaPipe ,Redis",
        image: "/images/moodify.png",
      },
      {
        name: "DealSlayer",
        category: "AI Negotiation Tool",
        toolsLabel: "Tools and features",
        techStack: "Javascript, React, Node.js, Express.js, MongoDB,",
        image: "/images/nego.png",

      },
      {
        name: "MacFolio",
        category: "MacOs style Portfolio",
        toolsLabel: "Tools and features",
        techStack: "Javascript, React, Tailwind CSS,RND  ",
        image: "/images/Macc.png",
      }
    ],
    []
  );

  const [current, setCurrent] = useState(0);
  const total = 4;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const activeProject = projects[current];

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-stage">
          <button className="arrow-btn left-arrow" onClick={prev} aria-label="Previous project">
            ‹
          </button>

          <div className="work-card" key={current}>
            <div className="work-info">
              <div className="work-title">
                <h3>{String(current + 1).padStart(2, "0")}</h3>
                <div>
                  <h4>{activeProject.name}</h4>
                  <p>{activeProject.category}</p>
                </div>
              </div>
              <h4>{activeProject.toolsLabel}</h4>
              <p>{activeProject.techStack}</p>
            </div>
            <div className="work-preview">
              <WorkImage image={activeProject.image} alt={activeProject.name} link={activeProject.link} />
            </div>
          </div>

          <button className="arrow-btn right-arrow" onClick={next} aria-label="Next project">
            ›
          </button>
        </div>

        <div className="work-dots" aria-label="Project indicators">
          {projects.map((_project, index) => (
            <button
              key={index}
              className={`dot ${index === current ? "active" : ""}`}
              onClick={() => setCurrent(index)}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
