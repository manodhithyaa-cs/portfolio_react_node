import { useRef } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/animations/CustomCursor";

const Index = () => {
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen">
      <Navigation />
      <main>
        <section id="home">
          <Hero scrollToProjects={() => projectsRef.current?.scrollIntoView({ behavior: "smooth" })}
                scrollToContact={() => contactRef.current?.scrollIntoView({ behavior: "smooth" })} />
        </section>
        <About />
        <section ref={projectsRef}>
          <Projects />
        </section>
        <section ref={contactRef}>
          <Contact />
        </section>
      </main>
      <Footer />
      </div>
    </>
  );
};

export default Index;
