"use client";
import React, { useState, useRef } from "react";
import ExperienceItem from "./ExperienceItem";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import experiencesData from "../../data/experiences.json";

const ExperiencesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 }
  };

  return (
    <section id="experiences">
      <div className="md:grid md:grid-cols-4 gap-8 items-start py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <div className="col-span-1">
          <h2 className="text-4xl font-bold text-white mb-4">Experience</h2>
          <p className="text-[#ADB7BE] mb-6">My professional journey and work history</p>
          <Link href="/experiences" className="px-6 py-3 rounded-full bg-gradient-to-br from-amber-700 to-red-500 hover:bg-slate-200 text-white font-semibold">
            View All
          </Link>
        </div>
        
        <div className="col-span-3 mt-6" ref={ref}>
          {experiencesData.slice(0, 3).map((experience, index, array) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              transition={{ duration: 0.3, delay: index * 0.2 }}
            >
              <ExperienceItem
                title={experience.title}
                company={experience.company}
                date={experience.date}
                description={experience.description}
                skills={experience.skills}
                isLast={index === array.length - 1}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperiencesSection;
