import HomeContent from "./HomeContent";
import { getCategories, getProducts } from "@/lib/actions/admin";

export default async function Home() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts()
  ]);

  // Transform products to match the expected format if needed
  // In the real DB, images is a string, and id is a string.
  const formattedProducts = products.map(p => ({
    ...p,
    image: p.images.split(',')[0], // Use first image
    category: p.category.name
  }));

  const featuredProducts = formattedProducts.slice(0, 4);

  return (
    <HomeContent 
      categories={categories} 
      featuredProducts={featuredProducts} 
    />
  );
}
