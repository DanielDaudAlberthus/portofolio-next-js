"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/experience";
import { Building2, Calendar } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-background relative overflow-hidden">
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
            Experience
            <span className="text-primary ml-2">/&gt;</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground font-mono max-w-2xl mx-auto">
            My professional journey and career timeline.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Main Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/10 to-transparent -translate-x-1/2" />

          <div className="space-y-12">
            {experience.map((job, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div key={job.id} className="relative flex items-center justify-between md:justify-normal w-full">
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(0,212,255,0.5)]" />

                  {/* Desktop Empty Space */}
                  <div className={`hidden md:block w-5/12 ${isEven ? 'order-1' : 'order-3'}`} />

                  {/* Content Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={`w-full pl-20 md:pl-0 md:w-5/12 ${isEven ? 'order-3 md:text-left' : 'order-2 md:text-right md:pr-16'}`}
                  >
                    <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-white/10 hover:border-primary/50 transition-colors group relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className={`flex flex-col ${!isEven && 'md:items-end'} relative z-10`}>
                        <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {job.role}
                        </h3>
                        
                        <div className={`flex items-center text-primary/80 mb-4 text-sm font-mono ${!isEven && 'md:flex-row-reverse md:space-x-reverse'}`}>
                          <Building2 className="w-4 h-4 mr-2" />
                          <span>{job.company}</span>
                          <span className="mx-2">•</span>
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{job.startDate} - {job.endDate}</span>
                        </div>

                        <ul className="space-y-2 text-muted-foreground text-sm text-left">
                          {job.description.map((desc, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-primary mr-2 mt-1">▹</span>
                              <span>{desc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
