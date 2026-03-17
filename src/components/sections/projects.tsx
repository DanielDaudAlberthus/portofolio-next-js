"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-background border-y border-white/5 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 inline-flex items-center">
            <span className="text-primary mr-2">&lt;</span>
            Featured Projects
            <span className="text-primary ml-2">/&gt;</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground font-mono max-w-2xl mx-auto">
            Some of the things I&apos;ve built.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative rounded-xl overflow-hidden bg-card border border-white/10 hover:border-primary/50 transition-colors flex flex-col h-full"
            >
              {/* Project Image */}
              <div className="relative h-48 sm:h-64 overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply group-hover:opacity-0 transition-opacity z-10" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
              </div>

              {/* Project Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-6 flex-1 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-white/5 hover:bg-white/10 text-primary/80 font-mono text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 mt-auto">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-lg border border-white/20 hover:bg-white/10 text-sm font-medium h-9 px-3 transition-colors">
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </a>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-lg bg-primary/20 text-primary hover:bg-primary/30 text-sm font-medium h-9 px-3 transition-colors">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
