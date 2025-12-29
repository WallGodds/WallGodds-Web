import React, { useEffect, useRef, useState } from "react";
import NavBar from "../CommonModule/NavBarModule/NavBar";
import styles from "./Aboutus.module.css";

const Aboutus = () => {
  const aboutContentRef = useRef(null);
  const [showBlend, setShowBlend] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (aboutContentRef.current) {
        const scrollTop = aboutContentRef.current.scrollTop;
        setShowBlend(scrollTop > 0);
      }
    };

    const aboutContent = aboutContentRef.current;
    if (aboutContent) {
      aboutContent.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (aboutContent) {
        aboutContent.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.mainContent}>
        <div
          className={styles.blendOverlay}
          style={{ opacity: showBlend ? 1 : 0 }}
        />
        <div className={styles.aboutContent} ref={aboutContentRef}>
          <div className={styles.about}>
            <div className={styles.mainHeading}>
              <h1 className={`${styles.heading} ${styles.wallgodds}`}>
                WallGodds: Minimal by Design, Inspired by You
              </h1>
              <p className={styles.texts}>
                WallGodds is an open-source wallpaper project that fosters
                collaboration between developers and designers to create a
                dynamic platform for wallpapers. With a seamless blend of
                creativity and technology, WallGodds delivers an immersive
                experience for those who appreciate exceptional visual
                aesthetics.
                <br />
                Developers can contribute by enhancing the platform’s
                functionality, optimizing performance, and introducing
                innovative features, while designers can showcase their
                creativity by submitting stunning wallpapers for a global
                audience. With a focus on minimalism and user experience,
                WallGodds provides an open and collaborative environment where
                art and technology converge
              </p>
            </div>
            <div className={styles.mission}>
              <div className={styles.image}>
                <img src="./mission.jpg" alt="mission" />
              </div>
              <div className={styles.eachPart}>
                <h2 className={styles.heading}>Our Mission</h2>
                <div className={styles.imageBackground}>
                  <img src="./mission.jpg" alt="mission" />
                </div>
                <p className={styles.texts}>
                  At WallGodds, we strive to make digital art easily accessible
                  to everyone. Our platform allows users to effortlessly
                  discover wallpapers while giving designers a dedicated space
                  to share their creativity. With a focus on simplicity,
                  responsiveness, and inclusivity, we create a seamless browsing
                  experience across all devices. Through open-source
                  collaboration, we foster a community that values innovation
                  and user-centric design.
                </p>
              </div>
            </div>
            <div className={styles.mission}>
              <div className={`{styles.content} ${styles.eachPart}`}>
                <h2 className={styles.heading}>Our Inspiration</h2>
                <div className={styles.imageBackground}>
                  <img src="./inspiration.jpg" alt="mission" />
                </div>
                <p className={styles.texts}>
                  Inspired by simplicity, efficiency, and inclusivity, WallGodds
                  is built with a clean and functional design. Our goal is to
                  offer a smooth browsing experience while fostering a growing
                  community of designers, developers, and enthusiasts who bring
                  unique creativity to the platform.
                </p>
              </div>
              <div className={styles.image}>
                <img src="./inspiration.jpg" alt="inspiration" />
              </div>
            </div>
            <div className={styles.mission}>
              <div className={styles.image}>
                <img src="./core-values.jpg" alt="core-values" />
              </div>
              <div className={styles.eachPart}>
                <h2 className={styles.heading}>Core Values</h2>
                <div className={styles.imageBackground}>
                  <img src="./core-values.jpg" alt="mission" />
                </div>
                <p className={styles.texts}>
                  At WallGodds, we strive to make digital art easily accessible
                  to everyone. Our platform allows users to effortlessly
                  discover wallpapers while giving designers a dedicated space
                  to share their creativity. With a focus on simplicity,
                  responsiveness, and inclusivity, we create a seamless browsing
                  experience across all devices. Through open-source
                  collaboration, we foster a community that values innovation
                  and user-centric design.
                </p>
              </div>
            </div>
            <div className={styles.mission}>
              <div className={styles.eachPart}>
                <h2 className={styles.heading}>Milestone & Growth</h2>
                <div className={styles.imageBackground}>
                  <img src="./milestone.jpg" alt="milestone" />
                </div>
                <p className={styles.texts}>
                  At WallGodds, we strive to make digital art easily accessible
                  to everyone. Our platform allows users to effortlessly
                  discover wallpapers while giving designers a dedicated space
                  to share their creativity. With a focus on simplicity,
                  responsiveness, and inclusivity, we create a seamless browsing
                  experience across all devices. Through open-source
                  collaboration, we foster a community that values innovation
                  and user-centric design.
                </p>
              </div>
              <div className={styles.image}>
                <img src="./milestone.jpg" alt="milestone" />
              </div>
            </div>
            <div className={styles.socials}>
              <h1 className={`${styles.heading} ${styles.join}`}>
                Join Our Community
              </h1>
              <div className={styles.socialIcons}>
                <div className={styles.icons}>
                  <a href="https://discord.gg/kTQ5KWANp8" target="_blank">
                    <img src="/discord-icon.png" alt="discord" />
                  </a>
                </div>
                <div className={styles.icons}>
                  <a
                    href="https://github.com/Parnab03/WallGodds"
                    target="_blank"
                  >
                    <img src="/github-icon.png" alt="github" />
                  </a>
                </div>
                <div className={styles.icons}>
                  <a
                    href="https://www.linkedin.com/company/wallgodds/"
                    target="_blank"
                  >
                    <img src="/linkedin-icon.png" alt="linkedin" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={styles.blendOverlay2}
        style={{ opacity: showBlend ? 1 : 0 }}
      />
    </div>
  );
};

export default Aboutus;
