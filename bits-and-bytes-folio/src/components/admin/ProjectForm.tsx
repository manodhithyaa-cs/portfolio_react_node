import React, { useEffect, useState } from "react";

const ProjectForm = ({ onSave, editingProject }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    technologies: "",
    liveUrl: "",
    githubUrl: "",
    featured: false,
  });

  useEffect(() => {
    if (editingProject) {
      setForm({
        ...editingProject,
        technologies: editingProject.technologies?.join(", ") || "",
      });
    } else {
      setForm({
        title: "",
        description: "",
        image: "",
        technologies: "",
        liveUrl: "",
        githubUrl: "",
        featured: false,
      });
    }
  }, [editingProject]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalForm = {
      ...form,
      technologies: form.technologies.split(",").map((t) => t.trim()),
    };
    onSave(finalForm);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4 text-gray-900">
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="w-full p-2 border rounded bg-white text-black"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 border rounded bg-white text-black"
      />
      <input
        name="image"
        placeholder="Image URL"
        value={form.image}
        onChange={handleChange}
        className="w-full p-2 border rounded bg-white text-black"
      />
      <input
        name="technologies"
        placeholder="Technologies (comma separated)"
        value={form.technologies}
        onChange={handleChange}
        className="w-full p-2 border rounded bg-white text-black"
      />
      <input
        name="liveUrl"
        placeholder="Live URL"
        value={form.liveUrl}
        onChange={handleChange}
        className="w-full p-2 border rounded bg-white text-black"
      />
      <input
        name="githubUrl"
        placeholder="GitHub URL"
        value={form.githubUrl}
        onChange={handleChange}
        className="w-full p-2 border rounded bg-white text-black"
      />
      <label className="block text-white">
        <input
          type="checkbox"
          name="featured"
          checked={form.featured}
          onChange={handleChange}
          className="mr-2"
        />
        Featured Project
      </label>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        {editingProject ? "Update" : "Add"} Project
      </button>
    </form>
  );
};

export default ProjectForm;
