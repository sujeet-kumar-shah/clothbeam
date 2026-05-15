"use client";

import NextImage from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
}

import { useCart } from "@/context/CartContext";

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-beige/30">
        {product.isNew && (
          <div className="absolute top-3 left-3 z-10 bg-brand-black text-brand-ivory text-xs font-bold px-2 py-1 uppercase tracking-wider">
            New
          </div>
        )}
        
        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 text-brand-black backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:text-brand-gold hover:bg-white">
          <Heart className="h-4 w-4" />
        </button>

        <NextImage
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Quick Actions Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-gradient-to-t from-black/60 to-transparent flex gap-2 justify-center">
          <Button 
            size="sm" 
            variant="secondary" 
            className="w-full bg-white text-brand-black hover:bg-brand-gold hover:text-white"
            onClick={() => {
              addToCart(product);
              alert(`${product.name} added to cart!`);
            }}
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button size="icon" variant="secondary" className="bg-white text-brand-black hover:bg-brand-gold hover:text-white shrink-0">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Link href={`/product/${product.id}`} className="block p-4">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
          {product.category}
        </div>
        <h3 className="font-heading font-semibold text-brand-black text-lg truncate group-hover:text-brand-gold transition-colors">
          {product.name}
        </h3>
        <div className="mt-2 text-brand-black font-medium">
          ₹{product.price.toLocaleString("en-IN")}
        </div>
      </Link>
    </motion.div>
  );
}
