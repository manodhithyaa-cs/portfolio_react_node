import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import TypewriterText from "@/components/animations/TypewriterText";
import FadeInText from "@/components/animations/FadeInText";
import GradientText from "@/components/animations/GradientText";
import ParticleBackground from "@/components/animations/ParticleBackground";
import FloatingElements from "@/components/animations/FloatingElements";
import { motion } from "framer-motion";
import MyPic from "../assets/mypic.jpeg";

type HeroProps = {
  scrollToProjects: () => void;
  scrollToContact: () => void;
};

const Hero = ({ scrollToProjects, scrollToContact }: HeroProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <ParticleBackground />
      <FloatingElements count={8} />

      {/* Animated background circles */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.6, 0.3, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Profile */}
          <FadeInText delay={0.2}>
            <div className="relative inline-block mb-8">
              <motion.div
                className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary/20 shadow-glow"
                whileHover={{ scale: 1.05 }}
                animate={{
                  boxShadow: [
                    "0 0 20px hsl(var(--primary) / 0.3)",
                    "0 0 40px hsl(var(--primary) / 0.6)",
                    "0 0 20px hsl(var(--primary) / 0.3)",
                  ],
                }}
                transition={{
                  boxShadow: { duration: 2, repeat: Infinity },
                  scale: { duration: 0.2 },
                }}
              >
                <img src={MyPic} alt="Manodhithyaa C S" className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </FadeInText>

          {/* Name and Role */}
          <div className="space-y-4">
            <FadeInText delay={0.4}>
              <h1 className="text-6xl md:text-8xl font-bold">
                <GradientText>
                  Manodhithyaa C S
                </GradientText>
              </h1>
            </FadeInText>
            <FadeInText delay={0.6}>
              <h2 className="text-2xl md:text-3xl text-muted-foreground font-light">
                <TypewriterText
                  text="Full Stack Developer • AI • Robotics"
                  delay={1000}
                  speed={70}
                />
              </h2>
            </FadeInText>
          </div>

          {/* Bio */}
          <FadeInText delay={0.8} direction="up">
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              <TypewriterText
                text="From building a biometric attendance system to deploying a secure password vault, I love crafting full-stack apps, experimenting with IoT, and bringing ideas to life. Clean code, purposeful design, and creative problem-solving drive everything I do."
                delay={3000}
                speed={30}
              />
            </p>
          </FadeInText>

          {/* CTA Buttons */}
          <FadeInText delay={1.0}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="hero" size="xl" className="group" onClick={scrollToProjects}>
                  View My Projects
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowDown className="ml-2" />
                  </motion.div>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="glass" size="xl" onClick={scrollToContact}>
                  Get In Touch
                </Button>
              </motion.div>
            </div>
          </FadeInText>

          {/* Socials */}
          <FadeInText delay={1.2}>
            <div className="flex justify-center space-x-6">
              {[
                { icon: Github, href: "https://github.com/manodhithyaa-cs", delay: 0 },
                { icon: Linkedin, href: "https://linkedin.com/in/manodhithyaa", delay: 0.1 },
                { icon: Mail, href: "mailto:reachme@manodhithyaa.me", delay: 0.2 },
              ].map(({ icon: Icon, href, delay }, index) => (
                <motion.div
                  key={index}
                  onClick={() => window.open(href, "_blank")}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + delay, duration: 0.3 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Icon className="h-5 w-5" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </FadeInText>
        </div>
      </div>

      {/* Scroll down indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </motion.div>
    </section>
  );
};

export default Hero;
