"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "DownLink",
    description:
      "Download HD videos from YouTube and Instagram via a simple interface.",
    image:
      "https://github.com/arkorty/DownLink/blob/master/blob/cover.png?raw=true",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/arkorty/DownLink",
    previewUrl: "https://downlink.webark.in/",
  },
  {
    id: 2,
    title: "Reduce",
    description: "Shorten long URLs for easy access and sharing.",
    image:
      "https://github.com/arkorty/Reduce/blob/master/blob/cover.png?raw=true",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/arkorty/Reduce",
    previewUrl: "https://r.webark.in/",
  },
  {
    id: 3,
    title: "CodeShare",
    description:
      "Store and share code snippets easily using a unique 6-letter code.",
    image:
      "https://github.com/arkorty/CodeShare/blob/master/blob/cover.png?raw=true",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/arkorty/CodeShare",
    previewUrl: "https://codeshare.webark.in/",
  },
  {
    id: 4,
    title: "RUSTCM-CLI",
    description: "UTF-8 text cipher using XChaCha20-Poly1305.",
    image:
      "https://github.com/arkorty/rustcm-cli/blob/master/blob/cover.png?raw=true",
    tag: ["All", "CLI", "Crypto"],
    gitUrl: "https://github.com/arkorty/rustcm-cli",
    previewUrl: "",
  },
  {
    id: 5,
    title: "Neolite",
    description: "Lightweight IDE based on Neovim.",
    image:
      "https://github.com/arkorty/Neolite/blob/master/blob/cover.png?raw=true",
    tag: ["All", "CLI"],
    gitUrl: "https://github.com/arkorty/neolite",
    previewUrl: "",
  },
  {
    id: 7,
    title: "ExprEval++",
    description: "AST implementation via OOP in C++",
    image:
      "https://github.com/arkorty/ExprEvalplusplus/blob/master/blob/cover.png?raw=true",
    tag: ["All", "CLI"],
    gitUrl: "https://github.com/arkorty/ExprEvalplusplus",
    previewUrl: "",
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

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
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="CLI"
          isSelected={tag === "CLI"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Crypto"
          isSelected={tag === "Crypto"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
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
