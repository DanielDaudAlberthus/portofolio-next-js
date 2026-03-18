"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Save, Plus, Trash2, LogOut } from "lucide-react";

type Tab = "profile" | "projects" | "experience" | "skills" | "certificates";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  // Profile state
  const [profile, setProfile] = useState({
    name: "",
    role: "",
    bio: "",
    avatarUrl: "",
    email: "",
    location: "",
    github: "",
    linkedin: "",
    twitter: "",
  });

  // Projects state
  const [projects, setProjects] = useState<any[]>([]);
  // Experience state
  const [experiences, setExperiences] = useState<any[]>([]);
  // Skills state
  const [skills, setSkills] = useState<any[]>([]);
  // Certificates state
  const [certificates, setCertificates] = useState<any[]>([]);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const fetchAll = useCallback(async () => {
    const [profileRes, projectsRes, expRes, skillsRes, certsRes] =
      await Promise.all([
        fetch("/api/profile"),
        fetch("/api/projects"),
        fetch("/api/experience"),
        fetch("/api/skills"),
        fetch("/api/certificates"),
      ]);

    const profileData = await profileRes.json();
    if (profileData) {
      setProfile({
        name: profileData.name || "",
        role: profileData.role || "",
        bio: profileData.bio || "",
        avatarUrl: profileData.avatarUrl || "",
        email: profileData.email || "",
        location: profileData.location || "",
        github: profileData.github || "",
        linkedin: profileData.linkedin || "",
        twitter: profileData.twitter || "",
      });
    }

    setProjects(await projectsRes.json());
    setExperiences(await expRes.json());
    setSkills(await skillsRes.json());
    setCertificates(await certsRes.json());
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Save handlers
  const saveProfile = async () => {
    setSaving(true);
    await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    setSaving(false);
    showMessage("Profile saved!");
  };

  const saveProject = async (project: any) => {
    setSaving(true);
    const method = project.id ? "PUT" : "POST";
    const res = await fetch("/api/projects", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...project,
        tech: typeof project.tech === "string" ? project.tech : project.tech.join(", "),
      }),
    });
    const saved = await res.json();
    if (!project.id) {
      setProjects((prev) => prev.map((p) => (p === project ? { ...saved, tech: saved.tech?.split(", ") || [] } : p)));
    }
    setSaving(false);
    showMessage("Project saved!");
  };

  const deleteProject = async (id: number) => {
    await fetch("/api/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setProjects((prev) => prev.filter((p) => p.id !== id));
    showMessage("Project deleted!");
  };

  const saveExperience = async (exp: any) => {
    setSaving(true);
    const method = exp.id ? "PUT" : "POST";
    const res = await fetch("/api/experience", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...exp,
        description: typeof exp.description === "string"
          ? exp.description.split("\n").filter((s: string) => s.trim())
          : exp.description,
      }),
    });
    const saved = await res.json();
    if (!exp.id) {
      setExperiences((prev) =>
        prev.map((e) => (e === exp ? { ...saved, description: JSON.parse(saved.description) } : e))
      );
    }
    setSaving(false);
    showMessage("Experience saved!");
  };

  const deleteExperience = async (id: number) => {
    await fetch("/api/experience", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setExperiences((prev) => prev.filter((e) => e.id !== id));
    showMessage("Experience deleted!");
  };

  const saveSkill = async (skill: any) => {
    setSaving(true);
    const method = skill.id ? "PUT" : "POST";
    const res = await fetch("/api/skills", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...skill,
        items: typeof skill.items === "string" ? skill.items : skill.items.join(", "),
      }),
    });
    const saved = await res.json();
    if (!skill.id) {
      setSkills((prev) =>
        prev.map((s) => (s === skill ? { ...saved, items: saved.items?.split(", ") || [] } : s))
      );
    }
    setSaving(false);
    showMessage("Skills saved!");
  };

  const deleteSkill = async (id: number) => {
    await fetch("/api/skills", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setSkills((prev) => prev.filter((s) => s.id !== id));
    showMessage("Skill category deleted!");
  };

  const saveCertificate = async (cert: any) => {
    setSaving(true);
    const method = cert.id ? "PUT" : "POST";
    const res = await fetch("/api/certificates", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cert),
    });
    const saved = await res.json();
    if (!cert.id) {
      setCertificates((prev) => prev.map((c) => (c === cert ? saved : c)));
    }
    setSaving(false);
    showMessage("Certificate saved!");
  };

  const deleteCertificate = async (id: number) => {
    await fetch("/api/certificates", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setCertificates((prev) => prev.filter((c) => c.id !== id));
    showMessage("Certificate deleted!");
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "profile", label: "Profile" },
    { key: "projects", label: "Projects" },
    { key: "experience", label: "Experience" },
    { key: "skills", label: "Skills" },
    { key: "certificates", label: "Certificates" },
  ];

  const inputClass =
    "w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors";
  const labelClass = "block text-sm font-medium text-zinc-400 mb-1.5";
  const btnPrimary =
    "inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50";
  const btnDanger =
    "inline-flex items-center gap-2 bg-zinc-800 hover:bg-red-900 text-red-400 hover:text-red-300 px-3 py-2 rounded-lg text-sm transition-colors";
  const btnSecondary =
    "inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors";

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Portfolio Admin</h1>
            <p className="text-sm text-zinc-500">Manage your portfolio content</p>
          </div>
          {message && (
            <div className="bg-green-900/50 border border-green-700 text-green-300 px-4 py-2 rounded-lg text-sm">
              {message}
            </div>
          )}
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">
              View Site &rarr;
            </a>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-zinc-900 p-1 rounded-xl mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? "bg-red-600 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Full Name</label>
                <input
                  className={inputClass}
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Daniel Daud Alberthus"
                />
              </div>
              <div>
                <label className={labelClass}>Role / Title</label>
                <input
                  className={inputClass}
                  value={profile.role}
                  onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                  placeholder="Back End Developer"
                />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input
                  className={inputClass}
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  placeholder="hello@example.com"
                />
              </div>
              <div>
                <label className={labelClass}>Location</label>
                <input
                  className={inputClass}
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  placeholder="Jakarta, Indonesia"
                />
              </div>
              <div>
                <label className={labelClass}>Avatar URL</label>
                <input
                  className={inputClass}
                  value={profile.avatarUrl}
                  onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Bio</label>
              <textarea
                className={inputClass + " h-24 resize-none"}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                placeholder="Write about yourself..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={labelClass}>GitHub URL</label>
                <input
                  className={inputClass}
                  value={profile.github}
                  onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                  placeholder="https://github.com/username"
                />
              </div>
              <div>
                <label className={labelClass}>LinkedIn URL</label>
                <input
                  className={inputClass}
                  value={profile.linkedin}
                  onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div>
                <label className={labelClass}>Twitter URL</label>
                <input
                  className={inputClass}
                  value={profile.twitter}
                  onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                  placeholder="https://twitter.com/username"
                />
              </div>
            </div>
            <button className={btnPrimary} onClick={saveProfile} disabled={saving}>
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            {projects.map((project, idx) => (
              <div key={project.id ? `project-${project.id}` : `new-project-${idx}`} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{project.title || "New Project"}</h3>
                  {project.id && (
                    <button className={btnDanger} onClick={() => deleteProject(project.id)}>
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Title</label>
                    <input
                      className={inputClass}
                      value={project.title || ""}
                      onChange={(e) => {
                        const updated = [...projects];
                        updated[idx] = { ...project, title: e.target.value };
                        setProjects(updated);
                      }}
                      placeholder="Project Title"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Image URL</label>
                    <input
                      className={inputClass}
                      value={project.image || ""}
                      onChange={(e) => {
                        const updated = [...projects];
                        updated[idx] = { ...project, image: e.target.value };
                        setProjects(updated);
                      }}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className={labelClass}>GitHub URL</label>
                    <input
                      className={inputClass}
                      value={project.githubUrl || ""}
                      onChange={(e) => {
                        const updated = [...projects];
                        updated[idx] = { ...project, githubUrl: e.target.value };
                        setProjects(updated);
                      }}
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Live URL</label>
                    <input
                      className={inputClass}
                      value={project.liveUrl || ""}
                      onChange={(e) => {
                        const updated = [...projects];
                        updated[idx] = { ...project, liveUrl: e.target.value };
                        setProjects(updated);
                      }}
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Description</label>
                  <textarea
                    className={inputClass + " h-20 resize-none"}
                    value={project.description || ""}
                    onChange={(e) => {
                      const updated = [...projects];
                      updated[idx] = { ...project, description: e.target.value };
                      setProjects(updated);
                    }}
                    placeholder="Describe the project..."
                  />
                </div>
                <div>
                  <label className={labelClass}>Tech Stack (comma-separated)</label>
                  <input
                    className={inputClass}
                    value={Array.isArray(project.tech) ? project.tech.join(", ") : project.tech || ""}
                    onChange={(e) => {
                      const updated = [...projects];
                      updated[idx] = { ...project, tech: e.target.value };
                      setProjects(updated);
                    }}
                    placeholder="Next.js, React, Tailwind CSS"
                  />
                </div>
                <button className={btnPrimary} onClick={() => saveProject(project)} disabled={saving}>
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save Project"}
                </button>
              </div>
            ))}
            <button
              className={btnSecondary}
              onClick={() =>
                setProjects([
                  ...projects,
                  { title: "", description: "", image: "", tech: "", githubUrl: "", liveUrl: "", displayOrder: projects.length },
                ])
              }
            >
              <Plus className="w-4 h-4" /> Add Project
            </button>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === "experience" && (
          <div className="space-y-6">
            {experiences.map((exp, idx) => (
              <div key={exp.id ? `exp-${exp.id}` : `new-exp-${idx}`} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{exp.role || "New Experience"}</h3>
                  {exp.id && (
                    <button className={btnDanger} onClick={() => deleteExperience(exp.id)}>
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Company</label>
                    <input
                      className={inputClass}
                      value={exp.company || ""}
                      onChange={(e) => {
                        const updated = [...experiences];
                        updated[idx] = { ...exp, company: e.target.value };
                        setExperiences(updated);
                      }}
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Role</label>
                    <input
                      className={inputClass}
                      value={exp.role || ""}
                      onChange={(e) => {
                        const updated = [...experiences];
                        updated[idx] = { ...exp, role: e.target.value };
                        setExperiences(updated);
                      }}
                      placeholder="Senior Developer"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Start Date</label>
                    <input
                      className={inputClass}
                      value={exp.startDate || ""}
                      onChange={(e) => {
                        const updated = [...experiences];
                        updated[idx] = { ...exp, startDate: e.target.value };
                        setExperiences(updated);
                      }}
                      placeholder="Jan 2023"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>End Date</label>
                    <input
                      className={inputClass}
                      value={exp.endDate || ""}
                      onChange={(e) => {
                        const updated = [...experiences];
                        updated[idx] = { ...exp, endDate: e.target.value };
                        setExperiences(updated);
                      }}
                      placeholder="Present"
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Description (one bullet point per line)</label>
                  <textarea
                    className={inputClass + " h-28 resize-none"}
                    value={
                      Array.isArray(exp.description)
                        ? exp.description.join("\n")
                        : exp.description || ""
                    }
                    onChange={(e) => {
                      const updated = [...experiences];
                      updated[idx] = { ...exp, description: e.target.value };
                      setExperiences(updated);
                    }}
                    placeholder="Led the development of...&#10;Mentored junior developers...&#10;Optimized database queries..."
                  />
                </div>
                <button className={btnPrimary} onClick={() => saveExperience(exp)} disabled={saving}>
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save Experience"}
                </button>
              </div>
            ))}
            <button
              className={btnSecondary}
              onClick={() =>
                setExperiences([
                  ...experiences,
                  { company: "", role: "", startDate: "", endDate: "", description: [], displayOrder: experiences.length },
                ])
              }
            >
              <Plus className="w-4 h-4" /> Add Experience
            </button>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === "skills" && (
          <div className="space-y-6">
            {skills.map((skill, idx) => (
              <div key={skill.id ? `skill-${skill.id}` : `new-skill-${idx}`} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{skill.category || "New Category"}</h3>
                  {skill.id && (
                    <button className={btnDanger} onClick={() => deleteSkill(skill.id)}>
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Category Name</label>
                  <input
                    className={inputClass}
                    value={skill.category || ""}
                    onChange={(e) => {
                      const updated = [...skills];
                      updated[idx] = { ...skill, category: e.target.value };
                      setSkills(updated);
                    }}
                    placeholder="Frontend, Backend, Tools & Others"
                  />
                </div>
                <div>
                  <label className={labelClass}>Skills (comma-separated)</label>
                  <input
                    className={inputClass}
                    value={Array.isArray(skill.items) ? skill.items.join(", ") : skill.items || ""}
                    onChange={(e) => {
                      const updated = [...skills];
                      updated[idx] = { ...skill, items: e.target.value };
                      setSkills(updated);
                    }}
                    placeholder="React, Next.js, TypeScript, Tailwind CSS"
                  />
                </div>
                <button className={btnPrimary} onClick={() => saveSkill(skill)} disabled={saving}>
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save Skills"}
                </button>
              </div>
            ))}
            <button
              className={btnSecondary}
              onClick={() =>
                setSkills([
                  ...skills,
                  { category: "", items: "", displayOrder: skills.length },
                ])
              }
            >
              <Plus className="w-4 h-4" /> Add Skill Category
            </button>
          </div>
        )}

        {/* Certificates Tab */}
        {activeTab === "certificates" && (
          <div className="space-y-6">
            {certificates.map((cert, idx) => (
              <div key={cert.id ? `cert-${cert.id}` : `new-cert-${idx}`} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{cert.name || "New Certificate"}</h3>
                  {cert.id && (
                    <button className={btnDanger} onClick={() => deleteCertificate(cert.id)}>
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Certificate Name</label>
                    <input
                      className={inputClass}
                      value={cert.name || ""}
                      onChange={(e) => {
                        const updated = [...certificates];
                        updated[idx] = { ...cert, name: e.target.value };
                        setCertificates(updated);
                      }}
                      placeholder="AWS Certified Solutions Architect"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Issuer</label>
                    <input
                      className={inputClass}
                      value={cert.issuer || ""}
                      onChange={(e) => {
                        const updated = [...certificates];
                        updated[idx] = { ...cert, issuer: e.target.value };
                        setCertificates(updated);
                      }}
                      placeholder="Amazon Web Services"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Date</label>
                    <input
                      className={inputClass}
                      value={cert.date || ""}
                      onChange={(e) => {
                        const updated = [...certificates];
                        updated[idx] = { ...cert, date: e.target.value };
                        setCertificates(updated);
                      }}
                      placeholder="Aug 2023"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Credential URL</label>
                    <input
                      className={inputClass}
                      value={cert.url || ""}
                      onChange={(e) => {
                        const updated = [...certificates];
                        updated[idx] = { ...cert, url: e.target.value };
                        setCertificates(updated);
                      }}
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <button className={btnPrimary} onClick={() => saveCertificate(cert)} disabled={saving}>
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save Certificate"}
                </button>
              </div>
            ))}
            <button
              className={btnSecondary}
              onClick={() =>
                setCertificates([
                  ...certificates,
                  { name: "", issuer: "", date: "", url: "", displayOrder: certificates.length },
                ])
              }
            >
              <Plus className="w-4 h-4" /> Add Certificate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
