"use client";

import { useState } from "react";
import { addCategory } from "@/lib/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CategoryForm({ onSuccess }: { onSuccess: () => void }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const result = await addCategory(formData);
    if (result.success) {
      alert("Category added successfully!");
      onSuccess();
    } else {
      alert(result.error);
    }
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-bold">Category Name</label>
        <Input name="name" placeholder="e.g. Ethnic Wear" required />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold">Description</label>
        <Input name="description" placeholder="Short description..." />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold">Cover Image URL</label>
        <Input name="image" placeholder="https://..." />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full bg-brand-black text-white hover:bg-brand-gold">
        {isLoading ? "Adding..." : "Add Category"}
      </Button>
    </form>
  );
}
