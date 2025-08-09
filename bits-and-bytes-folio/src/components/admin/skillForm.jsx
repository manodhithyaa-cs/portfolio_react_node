import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SkillForm = ({ onSave, editingSkill }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (editingSkill) {
      setName(editingSkill.name || "");
    } else {
      setName("");
    }
  }, [editingSkill]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name });
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-2">
      <Input
        type="text"
        placeholder="Skill name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button type="submit">{editingSkill ? "Update Skill" : "Add Skill"}</Button>
    </form>
  );
};

export default SkillForm;
