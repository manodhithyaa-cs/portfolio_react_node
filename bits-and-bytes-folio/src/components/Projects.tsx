"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(true);

  const hasMore = projects.length > visibleCount;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/projects");
        setProjects(res.data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleViewMore = () => {
    setVisibleCount(projects.length);
  };

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-text-gradient bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A collection of projects that showcase my skills and passion for creating exceptional digital experiences.
            </p>
          </div>

          {/* Loading fallback */}
          {loading ? (
            <p className="text-center text-muted-foreground">Loading projects...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.slice(0, visibleCount).map((project, index) => (
                <Card
                  key={project.id}
                  className={`group bg-card-gradient border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-card animate-fadeInUp overflow-hidden ${
                    project.featured ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="relative overflow-hidden">
                    <div className="aspect-video bg-muted/20 flex items-center justify-center border-b border-border/50">
                      <div className="text-muted-foreground text-sm">Project Preview</div>
                    </div>
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                      {/* <Button
                        variant="glass"
                        size="sm"
                        onClick={() => window.open(project.liveUrl, "_blank", "noopener,noreferrer")}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </Button> */}
                      {project.liveUrl && (
                        <Button
                        variant="glass"
                        size="sm"
                          onClick={() => window.open(project.liveUrl, "_blank", "noopener,noreferrer")}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          variant="glass"
                          size="sm"
                          onClick={() => window.open(project.githubUrl, "_blank", "noopener,noreferrer")}
                        >
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(project.technologies)
                        ? project.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="text-xs border-primary/20 hover:border-primary/40 transition-colors"
                            >
                              {tech}
                            </Badge>
                          ))
                        : null}
                    </div>

                    <div className="flex space-x-3 pt-2">
                      {project.liveUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => window.open(project.liveUrl, "_blank", "noopener,noreferrer")}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          variant="glass"
                          size="sm"
                          onClick={() => window.open(project.githubUrl, "_blank", "noopener,noreferrer")}
                        >
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {hasMore && !loading && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" onClick={handleViewMore}>
                View More Projects
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
