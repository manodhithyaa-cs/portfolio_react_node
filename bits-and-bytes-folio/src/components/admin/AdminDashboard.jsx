import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ProjectForm from "./ProjectForm";
import ProjectTable from "./ProjectTable";
import SkillForm from "./skillForm";
import SkillTable from "./skillTable";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);
  const navigate = useNavigate();

  // Logout
  const handleLogout = async () => {
    await axios.post("http://localhost:5000/api/logout", {}, { withCredentials: true });
    navigate("/admin");
  };

  // Fetch Projects & Skills
  const fetchProjects = async () => {
    const res = await axios.get("http://localhost:5000/api/projects", { withCredentials: true });
    setProjects(res.data);
  };

  const fetchSkills = async () => {
    const res = await axios.get("http://localhost:5000/api/skills", { withCredentials: true });
    setSkills(res.data);
  };

  useEffect(() => {
    fetchProjects();
    fetchSkills();
  }, []);

  // Handle Project Events
  const handleProjectEdit = (project) => setEditingProject(project);
  const handleProjectDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/projects/${id}`, { withCredentials: true });
    fetchProjects();
  };
  const handleProjectSave = async (formData) => {
    if (editingProject) {
      await axios.put(
        `http://localhost:5000/api/projects/${editingProject.id}`,
        formData,
        { withCredentials: true }
      );
    } else {
      await axios.post("http://localhost:5000/api/projects", formData, { withCredentials: true });
    }
    setEditingProject(null);
    fetchProjects();
  };

  // Handle Skill Events
  const handleSkillEdit = (skill) => setEditingSkill(skill);
  const handleSkillDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/skills/${id}`, { withCredentials: true });
    fetchSkills();
  };
  const handleSkillSave = async (formData) => {
    if (editingSkill) {
      await axios.put(
        `http://localhost:5000/api/skills/${editingSkill.id}`,
        formData,
        { withCredentials: true }
      );
    } else {
      await axios.post("http://localhost:5000/api/skills", formData, { withCredentials: true });
    }
    setEditingSkill(null);
    fetchSkills();
  };

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <Button onClick={handleLogout}>Logout</Button>
      </div>

      {/* Projects Section */}
      <section>
        <h3 className="text-xl font-semibold mb-2">Projects</h3>
        <ProjectForm onSave={handleProjectSave} editingProject={editingProject} />
        <ProjectTable projects={projects} onEdit={handleProjectEdit} onDelete={handleProjectDelete} />
      </section>

      {/* Skills Section */}
      <section>
        <h3 className="text-xl font-semibold mb-2">Skills</h3>
        <SkillForm onSave={handleSkillSave} editingSkill={editingSkill} />
        <SkillTable skills={skills} onEdit={handleSkillEdit} onDelete={handleSkillDelete} />
      </section>
    </div>
  );
};

export default AdminDashboard;
