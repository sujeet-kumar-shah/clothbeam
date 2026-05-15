"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Category Actions
export async function addCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;

  try {
    await prisma.category.create({
      data: {
        name,
        description,
        image,
      },
    });
    revalidatePath("/admin/dashboard");
    revalidatePath("/collection");
    return { success: true };
  } catch (error) {
    console.error("Failed to add category", error);
    return { error: "Failed to add category" };
  }
}

// Product Actions
export async function addProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const categoryId = formData.get("categoryId") as string;
  const images = formData.get("images") as string; // Expecting comma-separated
  const sizes = formData.get("sizes") as string; // Expecting comma-separated
  const isNew = formData.get("isNew") === "true";

  try {
    await prisma.product.create({
      data: {
        name,
        description,
        price,
        categoryId,
        images,
        sizes,
        isNew,
      },
    });
    revalidatePath("/admin/dashboard");
    revalidatePath("/collection");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to add product", error);
    return { error: "Failed to add product" };
  }
}

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getProducts() {
  return await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductById(id: string) {
  return await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
}
