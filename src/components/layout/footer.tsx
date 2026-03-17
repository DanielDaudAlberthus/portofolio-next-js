import { Code2 } from "lucide-react";
import { profile } from "@/data/profile";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Code2 className="w-5 h-5 text-primary" />
            </div>
            <span className="font-mono font-bold text-lg tracking-tighter">
              DANIEL<span className="text-primary">.DEV</span>
            </span>
          </div>

          <div className="flex space-x-6 text-sm font-mono text-muted-foreground">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
          <p>© {currentYear} {profile.name}. All rights reserved.</p>
          <p className="mt-2 md:mt-0 flex items-center">
            Built with <span className="text-primary mx-1">Next.js</span> & <span className="text-primary ml-1">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
