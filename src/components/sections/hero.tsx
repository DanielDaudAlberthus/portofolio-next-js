"use client";

import { Github, Linkedin, Instagram } from "lucide-react";
import { MinimalistHero } from "@/components/minimalist-hero";

interface ProfileData {
  name: string;
  role: string;
  bio: string;
  avatarUrl?: string | null;
  location: string;
  github?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
}

export default function Hero({ profile }: { profile: ProfileData }) {
  const roleParts = profile.role.split(" ");
  const part1 = roleParts.slice(0, -1).join(" ") || roleParts[0];
  const part2 = roleParts[roleParts.length - 1] || "";

  return (
    <section id="home">
      <MinimalistHero
        mainText={profile.bio}
        readMoreLink="#about"
        imageSrc={profile.avatarUrl || "/profile.png"}
        imageAlt={profile.name}
        overlayText={{ part1, part2 }}
        socialLinks={[
          ...(profile.github ? [{ icon: Github, href: profile.github }] : []),
          ...(profile.linkedin
            ? [{ icon: Linkedin, href: profile.linkedin }]
            : []),
          ...(profile.twitter
            ? [{ icon: Instagram, href: profile.twitter }]
            : []),
        ]}
        locationText={profile.location}
      />
    </section>
  );
}
