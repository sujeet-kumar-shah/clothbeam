"use client";

import { useState, useEffect } from "react";
import { addProduct, getCategories } from "@/lib/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ProductForm({ onSuccess }: { onSuccess: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const result = await addProduct(formData);
    if (result.success) {
      alert("Product added successfully!");
      onSuccess();
    } else {
      alert(result.error);
    }
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-bold">Product Name</label>
          <Input name="name" placeholder="e.g. Silk Kurta" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold">Category</label>
          <select name="categoryId" className="w-full h-9 rounded-md border border-gray-200 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold" required>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-bold">Price (₹)</label>
          <Input name="price" type="number" placeholder="4500" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold">Sizes (comma separated)</label>
          <Input name="sizes" placeholder="S,M,L,XL" required />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold">Description</label>
        <textarea 
          name="description" 
          className="w-full min-h-[100px] p-3 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold" 
          placeholder="Product details..."
          required
        ></textarea>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold">Image URLs (comma separated)</label>
        <Input name="images" placeholder="https://image1.jpg, https://image2.jpg" required />
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" name="isNew" value="true" id="isNew" className="rounded border-gray-300 text-brand-gold focus:ring-brand-gold" />
        <label htmlFor="isNew" className="text-sm font-medium">Mark as New Arrival</label>
      </div>

      <Button type="submit" disabled={isLoading || categories.length === 0} className="w-full bg-brand-black text-white hover:bg-brand-gold">
        {isLoading ? "Adding..." : categories.length === 0 ? "Create a category first" : "Add Product"}
      </Button>
    </form>
  );
}
