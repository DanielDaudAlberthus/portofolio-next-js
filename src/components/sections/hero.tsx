"use client";

import { Github, Linkedin, Twitter } from "lucide-react";
import { MinimalistHero } from "@/components/minimalist-hero";
import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section id="home">
      <MinimalistHero
        mainText={profile.bio}
        readMoreLink="#about"
        imageSrc="/profile.png"
        imageAlt={profile.name}
        overlayText={{ part1: "BACK", part2: "END" }}
        socialLinks={[
          { icon: Github, href: profile.socials.github },
          { icon: Linkedin, href: profile.socials.linkedin },
          { icon: Twitter, href: profile.socials.twitter },
        ]}
        locationText={profile.location}
      />
    </section>
  );
}
