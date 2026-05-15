import ProductDetailContent from "./ProductDetailContent";
import { getProductById } from "@/lib/actions/admin";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return notFound();
  }

  // Transform product to match the expected format
  const formattedProduct = {
    ...product,
    category: product.category.name,
    images: product.images.split(','),
    sizes: product.sizes.split(','),
    features: [
      "Premium imported fabric",
      "Tailored fit",
      "Comfortable and breathable",
      "Signature finishing"
    ] // Default features since schema doesn't have them yet
  };

  return <ProductDetailContent product={formattedProduct} />;
}
