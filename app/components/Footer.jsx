import React from "react";

const Footer = () => {
  return (
    <footer className="border border-t-[#33353F] border-l-transparent border-r-transparent border-b-transparent">
      <div className="container mx-auto p-12 text-center text-md text-gray-500">
        &copy; WebArk {new Date().getFullYear()} | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;