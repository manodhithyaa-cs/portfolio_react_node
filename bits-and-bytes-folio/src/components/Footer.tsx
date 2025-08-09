import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Github className="h-4 w-4" />, href: "https://www.github.com/manodhithyaa-cs", label: "GitHub" },
    { icon: <Linkedin className="h-4 w-4" />, href: "https://www.linkedin.com/in/manodhithyaa/", label: "LinkedIn" },
    { icon: <Mail className="h-4 w-4" />, href: "mailto:reachme@manodhithyaa.me", label: "Email" },
  ];

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="border-t border-border/50 bg-card/20">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="text-2xl font-bold">
                <span className="bg-text-gradient bg-clip-text text-transparent">
                  Manodhithyaa C S
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Full Stack Developer passionate about creating beautiful, functional web applications that make a difference.
              </p>
              <div className="flex space-x-3">
                {socialLinks.map((link) => (
                  <Button
                    key={link.label}
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:scale-110 transition-transform"
                    asChild
                  >
                    <a href={link.href} target="_blank" aria-label={link.label}>
                      {link.icon}
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Get In Touch</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>reachme@manodhithyaa.me</p>
                <p>+91 9940447272</p>
                <p>India</p>
              </div>
              <br />
              <a href="mailto:reachme@manodhithyaa.me?subject=Start a Project">
                <Button variant="hero" size="sm">
                  Start a Project
                </Button>
              </a>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm flex items-center">
              © {currentYear} Manodhithyaa C S. Made with{" "}
              <Heart className="h-4 w-4 mx-1 text-red-500" fill="currentColor" />
              using React & Tailwind CSS
            </p>

            <div className="flex space-x-6 mt-4 md:mt-0">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Privacy Policy
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Privacy Policy</DialogTitle>
                  </DialogHeader>
                  <div className="text-sm space-y-4">
                    <p>This site collects basic contact form data: name, email, and message. It may use analytics tools to understand how users interact with the site.</p>
                    <p>Your data will never be shared or sold. It's only used to respond to your inquiries.</p>
                    <p>Cookies may be used to improve user experience. You can disable them in your browser settings.</p>
                    <p>For any concerns, contact me at <a href="mailto:reachme@manodhithyaa.me" className="text-primary underline">reachme@manodhithyaa.me</a>.</p>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Terms of Service
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Terms of Service</DialogTitle>
                  </DialogHeader>
                  <div className="text-sm space-y-4">
                    <p>All content on this website is owned by Manodhithyaa C S and may not be reused without permission.</p>
                    <p>This website is for informational purposes only. No guarantees are made regarding accuracy or completeness.</p>
                    <p>By using this site, you agree to these terms. They may be updated without prior notice.</p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
