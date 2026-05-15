import CollectionContent from "./CollectionContent";
import { getCategories, getProducts } from "@/lib/actions/admin";

export default async function CollectionPage() {
  const [categoriesData, products] = await Promise.all([
    getCategories(),
    getProducts()
  ]);

  const categories = ["All", ...categoriesData.map(c => c.name)];
  
  const formattedProducts = products.map(p => ({
    ...p,
    image: p.images.split(',')[0],
    category: p.category.name
  }));

  return (
    <CollectionContent 
      products={formattedProducts} 
      categories={categories} 
    />
  );
}
