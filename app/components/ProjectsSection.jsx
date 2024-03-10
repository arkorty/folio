"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "RUSTCM-CLI",
    description: "AEAD Stream Cipher CLI Tool",
    image: "/images/projects/rustcm-cli.png",
    tag: ["All", "CLI", "Crypto"],
    gitUrl: "//github.com/arkorty/rustcm-cli",
    previewUrl: "/",
  },
  {
    id: 2,
    title: "NEOLITE",
    description: "Lightweight IDE based on Neovim",
    image: "/images/projects/neolite.png",
    tag: ["All", "CLI"],
    gitUrl: "//github.com/arkorty/neolite",
    previewUrl: "/",
  },
  {
    id: 3,
    title: "arkorty.xyz",
    description: "Portfolio Website",
    image: "/images/projects/arkorty.xyz.png",
    tag: ["All", "Web"],
    gitUrl: "//github.com/arkorty/arkorty.xyz",
    previewUrl: "/",
  },
  {
    id: 4,
    title: "Arithmetic AST",
    description: "AST implementation via OOP in C++",
    image: "/images/projects/arithmetic-ast.png",
    tag: ["All", "CLI"],
    gitUrl: "//github.com/arkorty/arithmetic-ast",
    previewUrl: "/",
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
    project.tag.includes(tag),
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
