"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";
import projectsData from "@/data/projects.json";

const ProjectsSection = () => {
  const [activeTag, setActiveTag] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (selectedTag) => {
    setActiveTag((prevTag) => (prevTag === selectedTag ? "" : selectedTag));
  };

  const filteredProjects =
    activeTag === ""
      ? projectsData.projects
      : projectsData.projects.filter((project) => project.tag.includes(activeTag));

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
