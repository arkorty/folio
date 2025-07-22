"use client";

import React, { useTransition, useState } from "react";
import SolarSystemAnimation from "./CodeAnimation";
import TabButton from "./TabButton";
import skillsData from "../data/skills.json";

const AboutSection = () => {
  const [tab, setTab] = useState("tech-skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  // Create the tab content dynamically from JSON data
  const renderTabContent = (tabId) => {
    const currentTab = skillsData.tabs.find((t) => t.id === tabId);
    if (!currentTab) return null;

    return (
      <ul className="list-disc pl-4">
        {currentTab.items.map((item, index) => (
          <li key={index} className="mb-4 text-gray-400">
            <strong className="text-white text-xl">{item.name}</strong>{" "}
            {item.description}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <SolarSystemAnimation />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">
            {skillsData.about.title}
          </h2>
          <p className="text-justify lg:text-lg">
            {skillsData.about.description.replace(/'/g, "'")}
          </p>
          <div className="flex flex-row justify-start mt-8">
            {skillsData.tabs.map((tabItem) => (
              <TabButton
                key={tabItem.id}
                selectTab={() => handleTabChange(tabItem.id)}
                active={tab === tabItem.id}
              >
                {" "}
                {tabItem.label}{" "}
              </TabButton>
            ))}
          </div>
          <div className="mt-8">{renderTabContent(tab)}</div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
