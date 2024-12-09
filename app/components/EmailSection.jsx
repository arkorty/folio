"use client";

import React, { useState } from "react";
import GithubIcon from "../../public/github-icon.svg";
import LinkedinIcon from "../../public/linkedin-icon.svg";
import LeetCodeIcon from "../../public/leetcode-icon.svg";
import Link from "next/link";
import Image from "next/image";

const EmailSection = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, subject, message } = formData;

    if (!email || !subject || !message) {
      setStatus("Error");
      return;
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Success");
      } else {
        setStatus("Error");
      }
    } catch {
      setStatus("Error");
    }
  };

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
          I’m super excited to connect with fellow tech enthusiasts! 🚀 Always
          eager to share ideas, collaborate on projects, and learn together in
          the world of programming and development. Let’s inspire each other and
          grow as a community! Feel free to reach out—whether for a chat, to
          share something cool, or just to connect. You can find me on social
          media sites like{" "}
          <a className="text-white" href="https://x.com/arkorty">
            X
          </a>{" "}
          and{" "}
          <a
            className="text-purple-400"
            href="https://mastodon.social/@arkorty"
          >
            Mastodon
          </a>
          .
        </p>

        <div className="socials flex flex-row gap-2">
          <Link href="https://github.com/arkorty">
            <Image src={GithubIcon} alt="Github Icon" />
          </Link>
          <Link href="https://linkedin.com/in/arkorty">
            <Image src={LinkedinIcon} alt="Linkedin Icon" />
          </Link>
          <Link href="https://leetcode.com/arkorty">
            <Image src={LeetCodeIcon} alt="LeetCode Icon" />
          </Link>
        </div>
      </div>
      <div className="z-10">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="text-white block mb-2 text-sm font-medium"
            >
              Send Me an Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="your.email@example.com"
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
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="Subject"
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
              value={formData.message}
              onChange={handleChange}
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="Message"
            />
          </div>
          <button
            type="submit"
            className={`font-medium py-2.5 px-5 rounded-lg w-full ${
              status === "Success"
                ? "bg-green-500 hover:bg-green-600"
                : status === "Error"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-amber-500 hover:bg-amber-600"
            }`}
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default EmailSection;
