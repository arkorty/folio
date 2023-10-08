import React from "react";
import GithubIcon from "../../../public/github-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";
import LeetCodeIcon from "../../../public/leetcode-icon.svg";
import Link from "next/link";
import Image from "next/image";

const EmailSection = () => {
  return (
    <section
      id="contact"
      className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative"
    >
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
      <div className="z-10">
        <h5 className="text-xl font-bold text-white my-2">
          Let&apos;s Connect
        </h5>
        <p className="text-[#ADB7BE] text-justify mb-4 max-w-md">
          {" "}
          Hey there! I noticed your interest for programming and development,
          and I&apos;d love to connect with fellow tech enthusiasts. Let&apos;s
          exchange ideas, share projects, and learn together. Feel free to reach
          out anytime! You can find me on{" "}
          <a className="text-blue-400" href="//github.com/arkorty">
            GitHub
          </a>
          ,{" "}
          <a className="text-white" href="//x.com/arkorty">
            X.com
          </a>
          ,{" "}
          <a className="text-sky-400" href="//linkedin.com/in/arkorty">
            Linkedin
          </a>{" "}
          and{" "}
          <a className="text-purple-400" href="//mastodon.social/@arkorty">
            Mastodon
          </a>
          .
        </p>
        <div className="socials flex flex-row gap-2">
          <Link href="//github.com/arkorty">
            <Image src={GithubIcon} alt="Github Icon" />
          </Link>
          <Link href="//linkedin.com/in/arkorty">
            <Image src={LinkedinIcon} alt="Linkedin Icon" />
          </Link>
          <Link href="//leetcode.com/arkorty">
            <Image src={LeetCodeIcon} alt="LeetCode Icon" />
          </Link>
        </div>
      </div>
      <div className="z-10">
        <form className="flex flex-col">
          <div className="mb-6">
            <label
              htmlFor="email"
              className="text-white block mb-2 text-sm font-medium"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="john.doe@example.com"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="subject"
              className="text-white block text-sm mb-2 font-medium"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="subject"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="text-white block text-sm mb-2 font-medium"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="message"
            />
          </div>
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2.5 px-5 rounded-lg w-full"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default EmailSection;
