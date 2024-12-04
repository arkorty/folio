"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "BoostStats",
    description: "Track cohort progress on Google Cloud Skills Boost platform",
    image:
      "https://github.com/arkorty/booststats-frontend/blob/master/public/og-image.png?raw=true",
    tag: ["Web"],
    gitUrl: "https://github.com/arkorty/BoostStats",
    previewUrl: "https://booststats.webark.in/",
  },
  {
    id: 2,
    title: "RUSTCM-CLI",
    description:
      "Authenticated cipher using XChaCha20-Poly1305 in the command-line",
    image:
      "https://github.com/arkorty/rustcm-cli/blob/master/blob/cover.png?raw=true",
    tag: ["CLI", "Crypto"],
    gitUrl: "https://github.com/arkorty/rustcm-cli",
    previewUrl: "",
  },
  {
    id: 3,
    title: "DownLink",
    description: "Download videos from YouTube and Instagram",
    image:
      "https://github.com/arkorty/DownLink/blob/master/blob/cover.png?raw=true",
    tag: ["Web"],
    gitUrl: "https://github.com/arkorty/DownLink",
    previewUrl: "https://downlink.webark.in/",
  },
  {
    id: 4,
    title: "Room",
    description: "Multi-user room-based text editor",
    image:
      "https://github.com/arkorty/room-client/blob/main/public/og-image.png?raw=true",
    tag: ["Web"],
    gitUrl: "https://github.com/arkorty/Room",
    previewUrl: "https://room.webark.in/",
  },
  {
    id: 5,
    title: "CodeShare",
    description: "Share code snippets easily with syntax highlights",
    image:
      "https://github.com/arkorty/CodeShare/blob/master/blob/cover.png?raw=true",
    tag: ["Web"],
    gitUrl: "https://github.com/arkorty/CodeShare",
    previewUrl: "https://codeshare.webark.in/",
  },
  {
    id: 6,
    title: "Reduce",
    description: "URL shortner with QR code",
    image:
      "https://github.com/arkorty/Reduce/blob/master/blob/cover.png?raw=true",
    tag: ["Web"],
    gitUrl: "https://github.com/arkorty/Reduce",
    previewUrl: "https://r.webark.in/",
  },
  {
    id: 7,
    title: "ExprEval++",
    description: "Expression evaluator written in C++",
    image:
      "https://github.com/arkorty/ExprEvalplusplus/blob/master/blob/cover.png?raw=true",
    tag: ["CLI"],
    gitUrl: "https://github.com/arkorty/ExprEvalplusplus",
    previewUrl: "",
  },
  {
    id: 8,
    title: "Neolite",
    description: "IDE-like Neovim distro with Copilot",
    image:
      "https://github.com/arkorty/Neolite/blob/master/blob/cover.png?raw=true",
    tag: ["CLI"],
    gitUrl: "https://github.com/arkorty/Neolite",
    previewUrl: "",
  },
  {
    id: 9,
    title: "PrognosAI",
    description: "Health risk prediction using machine learning",
    image:
      "https://github.com/arkorty/PrognosAI/blob/master/blob/cover.jpg?raw=true",
    tag: ["ML"],
    gitUrl: "https://github.com/arkorty/PrognosAI",
    previewUrl: "",
  },
];

const ProjectsSection = () => {
  const [activeTag, setActiveTag] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (selectedTag) => {
    setActiveTag((prevTag) => (prevTag === selectedTag ? "" : selectedTag));
  };

  const filteredProjects =
    activeTag === ""
      ? projectsData
      : projectsData.filter((project) => project.tag.includes(activeTag));

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={() => handleTagChange("Web")}
          name="Web"
          isSelected={activeTag === "Web"}
        />
        <ProjectTag
          onClick={() => handleTagChange("CLI")}
          name="CLI"
          isSelected={activeTag === "CLI"}
        />
        <ProjectTag
          onClick={() => handleTagChange("Crypto")}
          name="Crypto"
          isSelected={activeTag === "Crypto"}
        />
        <ProjectTag
          onClick={() => handleTagChange("ML")}
          name="ML"
          isSelected={activeTag === "ML"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.2, delay: index * 0.2 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
