import React from "react";

const ExperienceItem = ({ title, company, date, description, skills, location, isLast = false }) => {
  const handleSkillClick = (skill) => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(skill)}`, '_blank');
  };

  return (
    <div className={`py-8 ${isLast ? '' : 'border-b border-[#33353F]'}`}>
      <div className="flex flex-col lg:flex-row justify-between mb-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <span className="text-gray-400">{date}</span>
      </div>
      <h4 className="text-lg font-semibold text-[#ADB7BE] mb-2">{company}</h4>
      <p className="text-sm text-gray-400 mb-2">{location}</p>
      <ul className="text-[#ADB7BE] mb-4 list-disc list-inside space-y-1">
        {description.map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span 
            key={index} 
            className="bg-[#181818] text-[#ADB7BE] border border-[#33353F] hover:border-amber-500 px-3 py-1 rounded-full text-sm cursor-pointer transition-all duration-300 hover:bg-[#232323]"
            onClick={() => handleSkillClick(skill)}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ExperienceItem;
