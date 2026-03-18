import Navbar from "@/components/layout/navbar";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import Certificates from "@/components/sections/certificates";
import Contact from "@/components/sections/contact";
import Footer from "@/components/layout/footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [profile, projects, experiences, skills, certificates] =
    await Promise.all([
      prisma.profile.findFirst(),
      prisma.project.findMany({ orderBy: { displayOrder: "asc" } }),
      prisma.experience.findMany({ orderBy: { displayOrder: "asc" } }),
      prisma.skillCategory.findMany({ orderBy: { displayOrder: "asc" } }),
      prisma.certificate.findMany({ orderBy: { displayOrder: "asc" } }),
    ]);

  const profileData = profile ?? {
    name: "Your Name",
    role: "Your Role",
    bio: "Your bio goes here.",
    avatarUrl: "",
    email: "hello@example.com",
    location: "Your Location",
    github: "",
    linkedin: "",
    twitter: "",
  };

  const projectsData = projects.map((p) => ({
    ...p,
    tech: p.tech.split(",").map((t) => t.trim()),
  }));

  const experienceData = experiences.map((e) => ({
    ...e,
    description: JSON.parse(e.description) as string[],
  }));

  const skillsData = skills.map((s) => ({
    ...s,
    items: s.items.split(",").map((i) => i.trim()),
  }));

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col w-full">
        <Hero profile={profileData} />
        <About profile={profileData} />
        <Skills skills={skillsData} />
        <Experience experiences={experienceData} />
        <Projects projects={projectsData} />
        <Certificates certificates={certificates} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
