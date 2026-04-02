import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./styles/Career.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Career = () => {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const section = container.current?.querySelector(".career-section");
      const timelineLine = container.current?.querySelector(".career-timeline");

      if (!section || !timelineLine) return;

      const careerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 30%",
          end: "100% center",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      careerTimeline
        .fromTo(
          ".career-timeline",
          { maxHeight: "10%" },
          { maxHeight: "100%", duration: 0.5 },
          0
        )
        .fromTo(
          ".career-timeline",
          { opacity: 0 },
          { opacity: 1, duration: 0.1 },
          0
        )
        .fromTo(
          ".career-info-box",
          { opacity: 0 },
          { opacity: 1, stagger: 0.1, duration: 0.5 },
          0
        )
        .fromTo(
          ".career-dot",
          { animationIterationCount: "infinite" },
          {
            animationIterationCount: "1",
            delay: 0.3,
            duration: 0.1,
          },
          0
        );

      if (window.innerWidth > 1024) {
        careerTimeline.fromTo(
          ".career-section",
          { y: 0 },
          { y: "20%", duration: 0.5, delay: 0.2 },
          0
        );
      } else {
        careerTimeline.fromTo(
          ".career-section",
          { y: 0 },
          { y: 0, duration: 0.5, delay: 0.2 },
          0
        );
      }

      return () => {
        careerTimeline.kill();
      };
    },
    { scope: container }
  );

  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <div ref={container}>
      <div className="career-section section-container">
        <div className="career-container">
          <h2>
            My career <span>&</span>
            <br /> experience
          </h2>
          <div className="career-info">
            <div className="career-timeline">
              <div className="career-dot"></div>
            </div>
            <div className="career-info-box">
              <div className="career-info-in">
                <div className="career-role">
                  <h4>Position In Company</h4>
                  <h5>Company Name</h5>
                </div>
                <h3>20XX</h3>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                labore sit non ipsum temporibus quidem, deserunt eaque officiis
                mollitia ratione suscipit repellat.
              </p>
            </div>
            <div className="career-info-box">
              <div className="career-info-in">
                <div className="career-role">
                  <h4>Position In Company</h4>
                  <h5>Company Name</h5>
                </div>
                <h3>20XX</h3>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                labore sit non ipsum temporibus quidem, deserunt eaque officiis
                mollitia ratione suscipit repellat.
              </p>
            </div>
            <div className="career-info-box">
              <div className="career-info-in">
                <div className="career-role">
                  <h4>Position In Company</h4>
                  <h5>Company Name</h5>
                </div>
                <h3>NOW</h3>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                labore sit non ipsum temporibus quidem, deserunt eaque officiis
                mollitia ratione suscipit repellat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
