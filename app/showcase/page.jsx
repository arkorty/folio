"use client";
import React, { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import websitesData from "../../data/showcase.json";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

const SidebarItem = ({ website, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-2 rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-gradient-to-r from-amber-500 to-red-500"
          : "bg-[#1a1a1a] hover:bg-[#252525]"
      }`}
    >
      <div className="relative w-full h-24 rounded overflow-hidden bg-[#0a0a0a]">
        {(website.image !== "" && (
          <Image src={website.image} alt={website.title} fill />
        )) || (
          <Image
            src={`https://v1.screenshot.11ty.dev/${encodeURIComponent(website.url)}/opengraph/`}
            alt={website.title}
            fill
          />
        )}
      </div>
    </button>
  );
};

export default function WebsitesPage() {
  const [selectedWebsite, setSelectedWebsite] = useState(
    websitesData.websites[0]
  );
  const [isLoading, setIsLoading] = useState(true);
  const [focusedCardIndex, setFocusedCardIndex] = useState(null);
  const scrollContainerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const isUserScrollingRef = useRef(false);

  const handleWebsiteChange = (website) => {
    setSelectedWebsite(website);
    setIsLoading(true);
  };

  const updateActiveWebsite = () => {
    if (!scrollContainerRef.current || !isUserScrollingRef.current) return;
    
    const container = scrollContainerRef.current;
    const cards = container.querySelectorAll('.website-card');
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    
    let closestIndex = 0;
    let closestDistance = Infinity;
    
    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    
    const newWebsite = websitesData.websites[closestIndex];
    if (selectedWebsite.id !== newWebsite.id) {
      setSelectedWebsite(newWebsite);
    }
  };

  const handleScroll = () => {
    // Mark that user is scrolling
    isUserScrollingRef.current = true;
    
    // Clear focus when scrolling
    setFocusedCardIndex(null);
    
    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Debounce the update to avoid rapid state changes
    scrollTimeoutRef.current = setTimeout(() => {
      updateActiveWebsite();
      isUserScrollingRef.current = false;
    }, 150);
  };

  const scrollToWebsite = (index) => {
    if (!scrollContainerRef.current) return;
    
    // Prevent scroll handler from updating state during programmatic scroll
    isUserScrollingRef.current = false;
    
    // Clear any pending scroll updates
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    const container = scrollContainerRef.current;
    const cards = container.querySelectorAll('.website-card');
    
    if (cards[index]) {
      setSelectedWebsite(websitesData.websites[index]);
      cards[index].scrollIntoView({ 
        behavior: 'smooth', 
        inline: 'start', 
        block: 'nearest' 
      });
    }
  };

  return (
    <main className="flex flex-col h-[100dvh] bg-[#121212] overflow-hidden fixed inset-0">
      <Navbar />
      <div className="flex-1 px-4 mt-4 py-4 pt-20 overflow-hidden min-h-0">
        {/* Desktop Layout */}
        <div className="hidden md:flex h-full gap-3 max-w-[calc(100vw-2rem)] mx-auto">
          {/* Sidebar */}
          <div className="w-52 bg-[#181818] border border-[#33353F] rounded-xl overflow-hidden flex flex-col shadow-xl flex-shrink-0">
            <div className="flex-1 overflow-y-auto p-2 space-y-2 min-h-0 scrollbar-hide">
              {websitesData.websites.map((website) => (
                <SidebarItem
                  key={website.id}
                  website={website}
                  isActive={selectedWebsite.id === website.id}
                  onClick={() => handleWebsiteChange(website)}
                />
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col bg-[#181818] border border-[#33353F] rounded-xl overflow-hidden shadow-xl min-w-0 relative">
            {/* Iframe */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#0a0a0a]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
              </div>
            )}
            <iframe
              key={selectedWebsite.id}
              src={selectedWebsite.url}
              className="w-full h-full rounded-xl"
              title={selectedWebsite.title}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
              onLoad={() => setIsLoading(false)}
            />

            {/* Floating Action Buttons */}
            <div className="absolute bottom-4 right-4 flex gap-2 z-20">
              <Link
                href={selectedWebsite.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-amber-700 to-red-500 hover:opacity-90 text-white rounded-lg transition-all duration-300 text-sm shadow-lg backdrop-blur-sm"
                title="Visit Site"
              >
                <EyeIcon className="h-4 w-4" />
                <span className="hidden md:inline">Visit</span>
              </Link>
              {selectedWebsite.gitUrl && (
                <Link
                  href={selectedWebsite.gitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-[#181818]/90 backdrop-blur-sm border border-[#ADB7BE] hover:border-white text-[#ADB7BE] hover:text-white rounded-lg transition-all duration-300 text-sm shadow-lg"
                  title="View Code"
                >
                  <CodeBracketIcon className="h-4 w-4" />
                  <span className="hidden md:inline">Code</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden h-full flex flex-col gap-3">
          {/* Horizontal Scroll Container */}
          <div 
            className="flex-1 overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory touch-pan-x" 
            ref={scrollContainerRef}
            onScroll={handleScroll}
          >
            <div className="flex gap-3 h-full px-[4vw]">
              {websitesData.websites.map((website, index) => (
                <div
                  key={website.id}
                  className="website-card flex-shrink-0 w-[92vw] bg-[#181818] border border-[#33353F] rounded-xl overflow-hidden shadow-xl relative snap-center touch-pan-x"
                  onClick={() => {
                    if (focusedCardIndex !== index) {
                      setFocusedCardIndex(index);
                    }
                  }}
                >
                  {isLoading && selectedWebsite.id === website.id && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#0a0a0a]">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
                    </div>
                  )}
                  <iframe
                    src={website.url}
                    className={`w-full h-full rounded-xl ${
                      focusedCardIndex === index ? "pointer-events-auto" : "pointer-events-none"
                    }`}
                    title={website.title}
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                    onLoad={() => selectedWebsite.id === website.id && setIsLoading(false)}
                  />
                  
                  {/* Floating Action Buttons */}
                  <div className="absolute bottom-4 right-4 flex gap-2 z-20">
                    <Link
                      href={website.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-amber-700 to-red-500 hover:opacity-90 text-white rounded-lg transition-all duration-300 shadow-lg backdrop-blur-sm"
                      title="Visit Site"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </Link>
                    {website.gitUrl && (
                      <Link
                        href={website.gitUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 bg-[#181818]/90 backdrop-blur-sm border border-[#ADB7BE] hover:border-white text-[#ADB7BE] hover:text-white rounded-lg transition-all duration-300 shadow-lg"
                        title="View Code"
                      >
                        <CodeBracketIcon className="h-5 w-5" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Scroll Dots Navigation */}
          <div className="flex justify-center gap-2 pb-2">
            {websitesData.websites.map((website, index) => (
              <button
                key={website.id}
                onClick={() => scrollToWebsite(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  selectedWebsite.id === website.id
                    ? "w-12 bg-gradient-to-r from-amber-500 to-red-500"
                    : "w-3 bg-[#33353F] hover:bg-[#ADB7BE]"
                }`}
                title={website.title}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
