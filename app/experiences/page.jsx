"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ExperienceItem from "../components/ExperienceItem";
import { motion } from "framer-motion";
import experiencesData from "../../data/experiences.json";

export default function Experiences() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredExperiences = searchTerm
    ? experiencesData.filter(exp => 
        exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : experiencesData;

  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-4">
        <header className="mb-12">
          <h1 className="text-5xl font-extrabold text-white mb-6">My Experience</h1>
          <p className="text-xl text-[#ADB7BE] max-w-2xl">
            A detailed overview of my professional journey, showcasing the roles I've undertaken, positions of responsibility, and the skills I've developed along the way.
          </p>
          
          {/* Search input */}
          <div className="mt-8">
            <input
              type="text"
              placeholder="Search experiences, companies, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-3 rounded-lg bg-[#18191E] text-white border border-[#33353F] focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </header>
        
        <section>
          <div className="max-w-4xl mx-auto">
            {filteredExperiences.map((experience, index, array) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
            
            {filteredExperiences.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#ADB7BE] text-lg">No experiences match your search criteria.</p>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
