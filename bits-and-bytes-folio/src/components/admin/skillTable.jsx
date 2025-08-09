import React from "react";
import { Button } from "@/components/ui/button";

const SkillTable = ({ skills, onEdit, onDelete }) => {
  return (
    <table className="w-full border text-sm text-gray-900">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Skill</th>
          <th className="border p-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {skills.map((skill) => (
          <tr key={skill.id}>
            <td className="border p-2 text-white">{skill.name}</td>
            <td className="border p-2 text-center space-x-2">
              <Button size="sm" onClick={() => onEdit(skill)}>Edit</Button>
              <Button size="sm" variant="destructive" onClick={() => onDelete(skill.id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SkillTable;
