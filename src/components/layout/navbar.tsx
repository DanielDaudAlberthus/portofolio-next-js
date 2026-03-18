"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map((link) => link.name.toLowerCase());
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="#home"
              onClick={(e) => handleClick(e, "#home")}
              className="flex items-center space-x-2 group relative z-[60]"
            >
              <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors">
                <Code2 className="w-6 h-6 text-primary" />
              </div>
              <span className="font-mono font-bold text-xl tracking-tighter text-glow">
                DANIEL<span className="text-primary">.DEV</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.name.toLowerCase();
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="relative inline-block group"
                  >
                    <span
                      className={`relative z-10 block uppercase font-sans font-semibold transition-colors duration-300 text-sm py-2 px-3 lg:px-4 ${
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-white"
                      }`}
                    >
                      {link.name}
                    </span>
                    <span
                      className={`absolute inset-0 border-t-2 border-b-2 border-primary transform transition-all duration-300 origin-center ${
                        isActive
                          ? "scale-y-100 opacity-100"
                          : "scale-y-[2] opacity-0 group-hover:scale-y-100 group-hover:opacity-100"
                      }`}
                    />
                    <span
                      className={`absolute top-[2px] left-0 w-full h-full bg-primary transform transition-all duration-300 origin-top ${
                        isActive
                          ? "scale-100 opacity-20"
                          : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                      }`}
                    />
                  </Link>
                );
              })}

              <Link
                href="#contact"
                onClick={(e) => handleClick(e, "#contact")}
                className="relative inline-block group ml-4"
              >
                <span className="relative z-10 block uppercase font-sans font-semibold transition-colors duration-300 text-sm py-2 px-4 text-primary group-hover:text-white">
                  Let&apos;s Talk
                </span>
                <span className="absolute inset-0 border-t-2 border-b-2 border-primary transform scale-y-100 opacity-100 transition-all duration-300 origin-center" />
                <span className="absolute top-[2px] left-0 w-full h-full bg-primary transform scale-0 opacity-0 transition-all duration-300 origin-top group-hover:scale-100 group-hover:opacity-100" />
              </Link>
            </nav>

            {/* Spacer for mobile toggle (actual button is outside header) */}
            <div className="md:hidden w-10 h-10" />
          </div>
        </div>
      </motion.header>

      {/* Mobile Nav Toggle — outside header to avoid transform stacking context */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-5 right-4 sm:right-6 z-[60] p-2"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <div
          className={`w-6 h-0.5 bg-white mb-1.5 transition-transform duration-300 ${
            isOpen ? "transform rotate-45 translate-y-2" : ""
          }`}
        />
        <div
          className={`w-6 h-0.5 bg-white mb-1.5 transition-opacity duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <div
          className={`w-6 h-0.5 bg-white transition-transform duration-300 ${
            isOpen ? "transform -rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Mobile Menu Overlay — outside header to avoid transform stacking context */}
      <div
        className={`fixed inset-0 top-0 left-0 w-full h-full bg-background z-[55] transition-all duration-300 md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-center w-full h-full">
          <ul className="flex flex-col items-center space-y-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.name.toLowerCase();
              return (
                <li key={link.name} className="list-none">
                  <a
                    href={link.href}
                    className="relative inline-block group"
                    onClick={(e) => handleClick(e, link.href)}
                  >
                    <span
                      className={`relative z-10 block uppercase font-sans font-semibold transition-colors duration-300 text-xl py-2 px-4 ${
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-white"
                      }`}
                    >
                      {link.name}
                    </span>
                    <span
                      className={`absolute inset-0 border-t-2 border-b-2 border-primary transform transition-all duration-300 origin-center ${
                        isActive
                          ? "scale-y-100 opacity-100"
                          : "scale-y-[2] opacity-0 group-hover:scale-y-100 group-hover:opacity-100"
                      }`}
                    />
                    <span
                      className={`absolute top-[2px] left-0 w-full h-full bg-primary transform transition-all duration-300 origin-top ${
                        isActive
                          ? "scale-100 opacity-20"
                          : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
