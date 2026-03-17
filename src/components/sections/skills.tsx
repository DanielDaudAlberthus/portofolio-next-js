"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/skills";
import { Card, CardContent } from "@/components/ui/card";
import { Code2, Monitor, Database, Cloud, Layout, CheckCircle } from "lucide-react";

// Helper icon mapping based on category names
const iconMap: Record<string, React.ElementType> = {
  "Frontend": Monitor,
  "Backend": Database,
  "Tools & Others": Cloud,
  "Design": Layout,
};

export default function Skills() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  } as any;

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  } as any;

  return (
    <section id="skills" className="py-24 bg-background/50 border-y border-white/5 relative">
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
            Tech Stack
            <span className="text-primary ml-2">/&gt;</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground font-mono max-w-2xl mx-auto">
            Technologies, frameworks, and tools I use to build robust and scalable applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skillGroup, groupIdx) => {
            const Icon = iconMap[skillGroup.category] || Code2;
            
            return (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-white/10 h-full hover:border-primary/50 transition-colors duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-white/10">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">{skillGroup.category}</h3>
                    </div>
                    
                    <motion.div 
                      variants={container}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="grid grid-cols-2 gap-4"
                    >
                      {skillGroup.items.map((skill) => (
                        <motion.div 
                          key={skill} 
                          variants={item}
                          className="flex items-center space-x-2 group"
                        >
                          <CheckCircle className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors" />
                          <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                            {skill}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
