"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

interface ExperienceData {
  id: number;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export default function Experience({ experiences }: { experiences: ExperienceData[] }) {
  if (experiences.length === 0) return null;

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

        <div className="max-w-3xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-[19px] md:left-[23px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />

          <div className="space-y-8">
            {experiences.map((job, idx) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative flex gap-6 md:gap-8"
              >
                {/* Timeline Dot */}
                <div className="relative flex-shrink-0 mt-1">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                </div>

                {/* Content Card */}
                <div className="flex-1 pb-2">
                  <div className="p-5 md:p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all duration-300 group">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {job.role}
                        </h3>
                        <div className="flex items-center gap-1.5 text-primary/70 text-sm font-mono mt-1">
                          <Briefcase className="w-3.5 h-3.5" />
                          <span>{job.company}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-mono bg-white/5 px-3 py-1.5 rounded-full w-fit whitespace-nowrap">
                        <Calendar className="w-3.5 h-3.5 text-primary/50" />
                        <span>{job.startDate} — {job.endDate}</span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-gradient-to-r from-primary/20 via-white/5 to-transparent mb-4" />

                    {/* Description */}
                    <ul className="space-y-2.5">
                      {job.description.map((desc, i) => (
                        <li key={i} className="flex items-start text-sm text-muted-foreground leading-relaxed">
                          <span className="text-primary mr-3 mt-0.5 text-xs">&#9656;</span>
                          <span className="group-hover:text-foreground/80 transition-colors">{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
