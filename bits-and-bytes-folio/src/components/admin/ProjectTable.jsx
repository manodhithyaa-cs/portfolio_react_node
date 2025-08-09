import React from "react";

const ProjectTable = ({ projects, onEdit, onDelete }) => {
  return (
    <table className="w-full border text-sm text-gray-900">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Title</th>
          <th className="border p-2">Tech</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((p) => (
          <tr key={p.id} className="hover:bg-gray-50">
            <td className="border p-2 text-white">{p.title}</td>
            <td className="border p-2 text-white">
              {Array.isArray(p.technologies) ? p.technologies.join(", ") : p.technologies}
            </td>
            <td className="border p-2 space-x-2">
              <button
                onClick={() => onEdit(p)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(p.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectTable;
