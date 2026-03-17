"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { Mail, MapPin, Github, Linkedin, Twitter, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-background/50 border-t border-white/5 relative">
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
            Get In Touch
            <span className="text-primary ml-2">/&gt;</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground font-mono max-w-2xl mx-auto">
            My inbox is always open. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-card/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 overflow-hidden relative">
            
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative z-10 flex flex-col justify-center"
            >
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                <a href={`mailto:${profile.email}`} className="flex items-center space-x-4 text-muted-foreground hover:text-primary transition-colors group">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-mono mb-1">Email</p>
                    <p className="font-medium text-foreground">{profile.email}</p>
                  </div>
                </a>

                <div className="flex items-center space-x-4 text-muted-foreground">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-mono mb-1">Location</p>
                    <p className="font-medium text-foreground">{profile.location}</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <p className="text-sm font-mono text-muted-foreground mb-4 border-t border-white/5 pt-6">Connect across platforms</p>
                <div className="flex space-x-4">
                  <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all hover:-translate-y-1">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all hover:-translate-y-1">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all hover:-translate-y-1">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Direct CTA */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-10 flex flex-col items-center justify-center bg-white/5 rounded-xl p-8 border border-white/5 text-center"
            >
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <Send className="w-8 h-8 text-primary ml-1" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Start a Project</h3>
              <p className="text-muted-foreground mb-8 text-sm leading-relaxed max-w-[250px]">
                Interested in working together? We should queue up a chat. I'll buy the coffee.
              </p>
              <a href={`mailto:${profile.email}`} className="inline-flex w-full items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11 px-8 rounded-lg transition-colors">
                Say Hello
              </a>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
