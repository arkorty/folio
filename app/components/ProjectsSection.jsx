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
      "Web-app that allows users to download videos from YouTube and Instagram via a simple interface.",
    image: "/images/projects/downlink.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/arkorty/DownLink",
    previewUrl: "https://d.webark.in/",
  },
  {
    id: 2,
    title: "Reduce",
    description:
      "URL shortening service that allows users to easily shorten long URLs for easy access and sharing.",
    image: "/images/projects/reduce.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/arkorty/Reduce",
    previewUrl: "https://r.webark.in/",
  },
  {
    id: 3,
    title: "CodeShare",
    description:
      "Web-app that allows users to store text snippets and access them easily using a unique 6-letter code.",
    image:
      "https://raw.githubusercontent.com/arkorty/CodeShare/master/blob/codeshare.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/arkorty/CodeShare",
    previewUrl: "https://c.webark.in/",
  },
  {
    id: 4,
    title: "RUSTCM-CLI",
    description: "UTF-8 Streaming Text Cipher using XChaCha20-Poly1305.",
    image: "/images/projects/rustcm-cli.png",
    tag: ["All", "CLI", "Crypto"],
    gitUrl: "https://github.com/arkorty/rustcm-cli",
    previewUrl: "",
  },
  {
    id: 5,
    title: "NEOLITE",
    description: "Lightweight IDE based on Neovim.",
    image: "/images/projects/neolite.png",
    tag: ["All", "CLI"],
    gitUrl: "https://github.com/arkorty/neolite",
    previewUrl: "",
  },
  {
    id: 6,
    title: "folio",
    description: "Website to showcase projects and skills.",
    image: "/images/projects/arkorty.xyz.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/arkorty/arkorty.xyz",
    previewUrl: "",
  },
  {
    id: 7,
    title: "Arithmetic AST",
    description: "AST implementation via OOP in C++",
    image: "/images/projects/arithmetic-ast.png",
    tag: ["All", "CLI"],
    gitUrl: "https://github.com/arkorty/arithmetic-ast",
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
