"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const Profile = () => {
  const handleResumeDownload = () => {
    const link = document.createElement("a");
    const filename = "A.Chakraborty-Resume-SDE.pdf";
    link.href = "/resume/" + filename;
    link.download = filename;
    link.click();
  };

  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-left sm:text-left justify-self-left lg: text-left justify-self-left"
        >
          <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-red-500">
              Hi, I&apos;m{" "}
            </span>
            <br></br>
            <TypeAnimation
              sequence={[
                "Ark",
                1000,
                "Student",
                1000,
                "Developer",
                1000,
                "FOSS Enthusiast",
                1000,
              ]}
              wrapper="span"
              speed={30}
              repeat={Infinity}
            />
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
            My $HOME directory on the Interweb.
          </p>
          <div>
            <Link href="https://github.com/arkorty/folio" legacyBehavior>
              <a
                className="mb-3 px-6 inline-block py-3 w-fit sm:w-fit rounded-full mr-4 bg-gradient-to-br from-amber-700 to-red-500 hover:bg-slate-200 text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Source Code
              </a>
            </Link>
            <button
              onClick={handleResumeDownload}
              className="mb-12 px-1 inline-block py-1 w-fit sm:w-fit rounded-full bg-gradient-to-br from-amber-700 to-red-500 hover:bg-slate-800 text-white mt-3"
            >
              <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">
                Download Resume
              </span>
            </button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 place-self-center mt-4 lg:mt-0"
        >
          <div className="rounded-full relative mx-auto bg-gradient-to-r from-amber-500 to-red-500 lg: w-96 h-96 overflow-hidden">
            <Image src="/avatar.png" alt="avatar" sizes="512px" fill="true" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Profile;
