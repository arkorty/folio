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
        <li className="mb-4 text-gray-400">
          <strong className="text-pink-400 text-xl">
            Linux & Unix Systems
          </strong>{" "}
          Expert in managing and configuring *nix OSes with a focus on security,
          performance, and automation.
        </li>
        <li className="mb-4 text-gray-400">
          <strong className="text-pink-400 text-xl">
            Bash & POSIX Shell Scripting
          </strong>{" "}
          Advanced scripting capabilities for automation, system administration,
          and tool creation.
        </li>
        <li className="mb-4 text-gray-400">
          <strong className="text-pink-400 text-xl">
            Version Control with Git
          </strong>{" "}
          Proficient in branching strategies, conflict resolution, and
          collaborative workflows.
        </li>
        <li className="mb-4 text-gray-400">
          <strong className="text-pink-400 text-xl">
            Build Systems & CI/CD
          </strong>{" "}
          Intermediate experience in setting up and maintaining build pipelines
          using tools like Make, CMake, and Jenkins.
        </li>
      </ul>
    ),
  },
  {
    title: "Programming Languages",
    id: "languages",
    content: (
      <ul className="list-disc pl-4">
        <li className="mb-4 text-gray-400">
          <strong className="text-pink-400 text-xl">Rust</strong> Intermediate
          knowledge with a focus on systems programming and memory-safe code.
        </li>
        <li className="mb-4 text-gray-400">
          <strong className="text-pink-400 text-xl">C++</strong> Intermediate
          experience in writing high-performance code and understanding of core
          concepts like OOP, STL, and memory management.
        </li>
        <li className="mb-4 text-gray-400">
          <strong className="text-pink-400 text-xl">JavaScript</strong> Have
          some experience building full-stack web apps.
        </li>
        <li className="mb-4 text-gray-400">
          <strong className="text-pink-400 text-xl">Go</strong> Beginner-level
          experience with a focus on building simple and efficient backends.
        </li>
      </ul>
    ),
  },
  {
    title: "Cloud Platforms",
    id: "cloud-platforms",
    content: (
      <ul className="list-disc pl-4">
        <li className="mb-4 text-gray-400">
          <strong className="text-pink-400 text-xl">AWS</strong> Have experience
          deploying nginx reverse proxies, containerized backends and Nextcloud
          instances using services like EC2 & S3.
        </li>
        <li className="mb-4 text-gray-400">
          <strong className="text-pink-400 text-xl">Oracle Cloud</strong>{" "}
          Beginner knowledge in using Compute Engine and Scalable Storage.
        </li>
        <li className="mb-4 text-gray-400">
          <strong className="text-pink-400 text-xl">Vercel</strong> Beginner
          experience deploying frontend applications with seamless integration
          of CI/CD for Next.js projects.
        </li>
        <li className="mb-4 text-gray-400">
          <strong className="text-pink-400 text-xl">GitHub</strong> Advanced use
          of GitHub features for collaborative development, automation via
          Actions, and repository management.
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
            Hey! I&apos;m Ark, a programmer who loves open-source and tinkering
            with Linux. I&apos;m all about the command line, customizing
            systems, and getting into the nitty-gritty details. I enjoy making
            tech efficient, flexible, and accessible.
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("tech-skills")}
              active={tab === "tech-skills"}
            >
              {" "}
              Skills{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("languages")}
              active={tab === "languages"}
            >
              {" "}
              Languages{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("cloud-platforms")}
              active={tab === "cloud-platforms"}
            >
              {" "}
              Cloud{" "}
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
