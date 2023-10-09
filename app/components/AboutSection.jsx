"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Tech Skills",
    id: "tech-skills",
    content: (
      <ul className="list-disc pl-2">
        <li>Linux (Server Administration)</li>
        <li>Python (Automation)</li>
        <li>Bash/POSIX Shell (Commandline)</li>
        <li>Git (Source Version Control)</li>
        <li>Make (Build System)</li>
      </ul>
    ),
  },
  {
    title: "Programming Languages",
    id: "languages",
    content: (
      <ul className="list-disc pl-2">
        <li>Rust — memory-safe multi-paradigm language</li>
        <li>C++ — general-purpose language</li>
        <li>Python — dynamically-typed general-purpose language</li>
        <li>Java — high-level, class-based, object-oriented language</li>
        <li>Go — statically typed, compiled high-level language</li>
      </ul>
    ),
  },
  {
    title: "Cloud Platforms",
    id: "cloud-platforms",
    content: (
      <ul className="list-disc pl-2">
        <li>Amazon Web Services (Beginner)</li>
        <li>Google Cloud Platform (Beginner)</li>
        <li>Vercel (Beginner)</li>
        <li>GitHub (Advanced)</li>
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
            Hi! I&apos;m Ark, a dedicated student and programmer with an
            unwavering passion for libre software. With an insatiable curiosity
            for technology and a strong commitment to open-source principles.
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
