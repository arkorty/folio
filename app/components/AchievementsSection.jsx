"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTrail, animated } from "@react-spring/web";
import axios from "axios";

const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), {
  ssr: false,
});

const AchievementsSection = () => {
  const [achievements, setAchievements] = useState([
    { metric: "Repos", value: "0", postfix: "+" },
    { metric: "Commits", value: "0", postfix: "+" },
    { metric: "Stars", value: "0", postfix: "" },
    { metric: "Followers", value: "0", postfix: "" },
  ]);

  const [topLanguages, setTopLanguages] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState(null);
  const [languageIndex, setLanguageIndex] = useState(0);

  const fetchGitHubStats = async () => {
    try {
      const response = await axios.get("/api/github");

      if (response.status === 200) {
        const { repos, commits, stars, languages, followers } = response.data;

        setAchievements([
          { metric: "Repos", value: repos.toString(), postfix: "+" },
          { metric: "Commits", value: commits.toString(), postfix: "+" },
          { metric: "Stars", value: stars.toString(), postfix: "" },
          { metric: "Followers", value: followers.toString(), postfix: "" },
        ]);

        const languageArray = Object.entries(languages)
          .map(([language, count]) => ({
            language,
            count,
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10);

        setTopLanguages(languageArray);

        if (languageArray.length > 0) {
          setCurrentLanguage(languageArray[0]);
        }
      } else {
        console.error("Failed to fetch GitHub stats:", response.data);
      }
    } catch (error) {
      console.error("Error fetching GitHub stats:", error);
    }
  };

  useEffect(() => {
    fetchGitHubStats();
  }, []);

  useEffect(() => {
    if (topLanguages.length === 0) return;

    const interval = setInterval(() => {
      setLanguageIndex((prevIndex) => (prevIndex + 1) % topLanguages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [topLanguages]);

  useEffect(() => {
    if (topLanguages.length > 0) {
      setCurrentLanguage(topLanguages[languageIndex]);
    }
  }, [languageIndex, topLanguages]);

  const letters = currentLanguage?.language.split("") || [];

  const trail = useTrail(letters.length, {
    to: { opacity: 1, transform: "translateY(0px)" },
    from: { opacity: 0, transform: "translateY(-20px)" },
    config: { tension: 180, friction: 12 },
    reset: true,
  });

  return (
    <div className="py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
      <div className="sm:border-[#33353F] sm:border rounded-md py-8 px-16 flex flex-col sm:flex-row items-center justify-center">
        <div className="flex flex-wrap justify-center items-center w-full sm:w-auto space-x-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0"
            >
              <h2 className="text-white text-4xl font-bold flex flex-row">
                {achievement.prefix}
                <AnimatedNumbers
                  includeComma
                  animateToNumber={parseInt(achievement.value)}
                  locale="en-US"
                  className="text-white text-4xl font-bold"
                  configs={(_, index) => ({
                    mass: 1,
                    friction: 100,
                    tensions: 140 * (index + 1),
                  })}
                />
                {achievement.postfix}
              </h2>
              <p className="text-[#ADB7BE] text-base">{achievement.metric}</p>
            </div>
          ))}

          {currentLanguage && (
            <div
              className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0"
              style={{ minWidth: "200px" }}
            >
              <h2 className="text-white text-4xl font-bold flex flex-row">
                {trail.map((style, i) => (
                  <animated.span key={i} style={style}>
                    {letters[i]}
                  </animated.span>
                ))}
              </h2>
              <p className="text-[#ADB7BE] text-base">Languages</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementsSection;
