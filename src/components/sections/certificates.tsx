"use client";

import { motion } from "framer-motion";
import { certificates } from "@/data/certificates";
import { Award, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Certificates() {
  return (
    <section id="certificates" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
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
            Certificates
            <span className="text-primary ml-2">/&gt;</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground font-mono max-w-2xl mx-auto">
            Continuous learning and professional validations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="h-full bg-card/50 backdrop-blur-sm border-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                      <Award className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-xs font-mono text-muted-foreground bg-white/5 py-1 px-3 rounded-full">
                      {cert.date}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-muted-foreground mb-6 flex-1 text-sm">
                    Issued by <span className="text-foreground font-medium">{cert.issuer}</span>
                  </p>

                  <a href={cert.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center w-full justify-between hover:bg-white/5 hover:text-primary border border-white/5 group-hover:border-primary/20 transition-all mt-auto rounded-lg h-10 px-4 text-sm font-medium">
                    <span>View Credential</span>
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
