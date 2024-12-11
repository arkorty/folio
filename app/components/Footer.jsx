import React from "react";

const Footer = () => {
  return (
    <footer className="footer z-10 border border-t-[#33353F] border-l-transparent border-r-transparent border-b-transparent">
      <div className="container p-12 flex justify-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} WebArk. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
