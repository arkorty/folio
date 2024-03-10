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
        <li>Linux (*nix OSes) — Advanced</li>
        <li>Bash/POSIX Shell — Advanced</li>
        <li>Git — Advanced</li>
        <li>Build Systems — Intermediate</li>
      </ul>
    ),
  },
  {
    title: "Programming Languages",
    id: "languages",
    content: (
      <ul className="list-disc pl-2">
        <li>Rust — Intermediate</li>
        <li>C++ — Intermediate</li>
        <li>Python — Advanced</li>
        <li>Java — Advanced</li>
        <li>Go — Beginner</li>
      </ul>
    ),
  },
  {
    title: "Cloud Platforms",
    id: "cloud-platforms",
    content: (
      <ul className="list-disc pl-2">
        <li>Amazon Web Services — Beginner</li>
        <li>Google Cloud Platform — Beginner</li>
        <li>Vercel — Beginner</li>
        <li>GitHub — Advancedd</li>
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
            Hi! I&apos;m Ark, a dedicated programmer with a deep passion for
            libre software. With an insatiable curiosity for tech and a strong
            commitment to open-source principles. I like to obsesses over the
            command-line, Linux distros, software audio and display stack (i.e.
            Wayland and Pipewire), and everything else in between.
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
