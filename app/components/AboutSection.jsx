"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Technical Skills",
    id: "tech-skills",
    content: (
      <ul className="list-disc pl-4">
        <li>
          <strong>Linux & Unix Systems:</strong> Expert in managing and
          configuring *nix OSes with a focus on security, performance, and
          automation.
        </li>
        <li>
          <strong>Bash & POSIX Shell Scripting:</strong> Advanced scripting
          capabilities for automation, system administration, and tool creation.
        </li>
        <li>
          <strong>Version Control with Git:</strong> Proficient in branching
          strategies, conflict resolution, and collaborative workflows.
        </li>
        <li>
          <strong>Build Systems & CI/CD:</strong> Intermediate experience in
          setting up and maintaining build pipelines using tools like Make,
          CMake, and Jenkins.
        </li>
      </ul>
    ),
  },
  {
    title: "Programming Languages",
    id: "languages",
    content: (
      <ul className="list-disc pl-4">
        <li>
          <strong>Rust:</strong> Intermediate knowledge with a focus on systems
          programming and memory-safe code.
        </li>
        <li>
          <strong>C++:</strong> Intermediate experience in writing
          high-performance code and understanding of core concepts like OOP,
          STL, and memory management.
        </li>
        <li>
          <strong>Python:</strong> Advanced proficiency in scripting,
          automation, data analysis, and backend development.
        </li>
        <li>
          <strong>Java:</strong> Advanced in building scalable applications,
          with strong understanding of OOP principles, multithreading, and the
          JVM ecosystem.
        </li>
        <li>
          <strong>Go:</strong> Beginner-level experience with a focus on
          building simple and efficient concurrent programs.
        </li>
      </ul>
    ),
  },
  {
    title: "Cloud Platforms",
    id: "cloud-platforms",
    content: (
      <ul className="list-disc pl-4">
        <li>
          <strong>Amazon Web Services (AWS):</strong> Beginner experience with
          deploying and managing applications using core services like EC2, S3,
          and Lambda.
        </li>
        <li>
          <strong>Google Cloud Platform (GCP):</strong> Beginner knowledge in
          using GCP tools for cloud infrastructure, primarily focusing on
          Compute Engine and Cloud Functions.
        </li>
        <li>
          <strong>Vercel:</strong> Beginner experience deploying frontend
          applications with seamless integration of CI/CD for Next.js projects.
        </li>
        <li>
          <strong>GitHub:</strong> Advanced use of GitHub features for
          collaborative development, automation via Actions, and repository
          management.
        </li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("tech-skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image
          src="/images/about.jpg"
          width={512}
          height={512}
          alt="about.jpg"
        />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-justify lg:text-lg">
            Hi! I&apos;m Ark, a passionate programmer with a deep love for libre
            software and open-source principles. My curiosity drives me to
            constantly explore and innovate in the tech world. I have a
            particular obsession with the command-line, Linux distributions, and
            the intricacies of the software audio and display stacks like
            Wayland and PipeWire. From system customization to performance
            tuning, I enjoy diving deep into the details that make software
            efficient, flexible, and accessible.
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("tech-skills")}
              active={tab === "tech-skills"}
            >
              {" "}
              Tech Skills{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("languages")}
              active={tab === "languages"}
            >
              {" "}
              Programming Languages{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("cloud-platforms")}
              active={tab === "cloud-platforms"}
            >
              {" "}
              Cloud Platforms{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
