import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Palette, Zap } from "lucide-react";
import FadeInText from "@/components/animations/FadeInText";
import GradientText from "@/components/animations/GradientText";
import { motion } from "framer-motion";

const About = () => {
  const [skills, setSkills] = useState([]);

  const services = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Full Stack Development",
      description: "Building scalable web applications with modern technologies and best practices."
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "UI/UX Design",
      description: "Creating intuitive and beautiful user interfaces that delight users."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Performance Optimization",
      description: "Optimizing applications for speed, accessibility, and user experience."
    }
  ];

  const currentYear = new Date().getFullYear();
  const startYear = 2022;
  const yearsOfExperience = currentYear - startYear;

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/skills_", { withCredentials: true });
        setSkills(res.data); // assumes data is an array of { id, name }
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <FadeInText delay={0.1}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <GradientText>About Me</GradientText>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Passionate developer with {yearsOfExperience}+ years of experience creating digital experiences that matter.
              </p>
            </div>
          </FadeInText>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* About Text */}
            <FadeInText delay={0.2} direction="left">
              <div className="space-y-6">
                <div className="prose prose-lg text-muted-foreground">
                  <p>
                    I'm a passionate full-stack developer and tech enthusiast who loves building real-world solutions—from smart web platforms to embedded systems.
                  </p>
                  <p>
                    My journey began with curiosity about how apps and devices communicate, which soon turned into building projects like biometric attendance systems, password vaults, and IoT-based drones.
                  </p>
                  <p>
                    When I’m not developing, I’m usually exploring new tech stacks, collaborating on innovative college projects, or watching the sunrise with my camera in hand.
                  </p>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Technologies I Work With</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill.id || index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                        whileHover={{ scale: 1.1, rotate: 2 }}
                      >
                        <Badge 
                          variant="secondary" 
                          className="text-sm hover:bg-primary/20 transition-colors cursor-pointer"
                        >
                          {skill.name}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInText>

            {/* Services */}
            <FadeInText delay={0.4} direction="right">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-6">What I Do</h3>
                <div className="space-y-4">
                  {services.map((service, index) => (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.2, duration: 0.5 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <Card className="p-6 bg-card-gradient border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-card group">
                        <div className="flex items-start space-x-4">
                          <motion.div 
                            className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            {service.icon}
                          </motion.div>
                          <div>
                            <h4 className="text-lg font-semibold mb-2">{service.title}</h4>
                            <p className="text-muted-foreground">{service.description}</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeInText>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
