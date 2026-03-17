"use client";

import { motion } from "framer-motion";
import { User2, Code2, Globe2, Briefcase } from "lucide-react";
import Image from "next/image";
import { profile } from "@/data/profile";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { icon: Briefcase, label: "Years Experience", value: "5+" },
  { icon: Code2, label: "Projects Completed", value: "30+" },
  { icon: Globe2, label: "Happy Clients", value: "20+" },
  { icon: User2, label: "Lines of Code", value: "1M+" },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-24 bg-background relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 inline-flex items-center">
            <span className="text-primary mr-2">&lt;</span>
            About Me
            <span className="text-primary ml-2">/&gt;</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square max-w-md mx-auto relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-purple-500/20 z-10" />
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"
                alt="Profile Setup"
                className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl z-20" />
            </div>

            {/* Floating decoration */}
            <motion.div
              className="absolute -bottom-6 -right-6 bg-background border border-border p-4 rounded-xl shadow-xl flex items-center space-x-3 z-30"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <Code2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-bold font-mono">Back End Developer</div>
                <div className="text-xs text-muted-foreground">Enthusiast</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center text-glow">
              <span className="text-primary mr-2">&gt;</span> Architecting
              digital experiences.
            </h3>

            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Hello! I&apos;m {profile.name}, a passionate {profile.role} based
              in {profile.location}. I specialize in building exceptional
              digital experiences that are fast, accessible, visually appealing,
              and responsive.
            </p>

            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              My journey in web development started back in 2018, and since then
              I&apos;ve had the privilege of working with a startup, a huge
              corporation, and as a freelance developer. I focus on building
              products that solve real-world problems.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {stats.map((stat, i) => (
                <Card
                  key={i}
                  className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors"
                >
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <stat.icon className="w-8 h-8 text-primary mb-3" />
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider font-mono text-center">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
