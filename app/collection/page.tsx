"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";

// Mock Data
const allProducts = [
  {
    id: "1",
    name: "Emerald Green Silk Kurta",
    price: 4500,
    category: "Ethnic Wear",
    image: "https://picsum.photos/seed/kurta1/800/800",
    isNew: true,
  },
  {
    id: "2",
    name: "Classic Beige Linen Shirt",
    price: 2800,
    category: "Premium Shirts",
    image: "https://picsum.photos/seed/shirt1/800/800",
  },
  {
    id: "3",
    name: "Midnight Black Suit",
    price: 12500,
    category: "Wedding Collection",
    image: "https://picsum.photos/seed/suit1/800/800",
    isNew: true,
  },
  {
    id: "4",
    name: "Textured Casual Polo",
    price: 1500,
    category: "Casual Wear",
    image: "https://picsum.photos/seed/polo1/800/800",
  },
  {
    id: "5",
    name: "Ivory Sherwani with Gold Threadwork",
    price: 18000,
    category: "Wedding Collection",
    image: "https://picsum.photos/seed/sherwani1/800/800",
  },
  {
    id: "6",
    name: "Olive Green Chinos",
    price: 2200,
    category: "Casual Wear",
    image: "https://picsum.photos/seed/chinos1/800/800",
  },
  {
    id: "7",
    name: "Royal Blue Kurta Pajama",
    price: 3500,
    category: "Ethnic Wear",
    image: "https://picsum.photos/seed/kurta2/800/800",
  },
  {
    id: "8",
    name: "White Oxford Button-Down",
    price: 2400,
    category: "Premium Shirts",
    image: "https://picsum.photos/seed/shirt2/800/800",
  },
];

const categories = ["All", "Casual Wear", "Ethnic Wear", "Premium Shirts", "Wedding Collection"];

export default function Collection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? allProducts 
    : allProducts.filter(p => p.category === activeCategory);

  return (
    <>
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 bg-brand-ivory min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-4xl md:text-5xl font-bold text-brand-black mb-4"
            >
              Our <span className="text-brand-gold italic">Collection</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Explore our complete range of premium clothing. From everyday casuals to exquisite wedding attire, find the perfect pieces for your wardrobe.
            </motion.p>
          </div>

          {/* Filters & Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-y border-brand-beige py-4">
            
            {/* Category Filter (Desktop) */}
            <div className="hidden md:flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? "default" : "ghost"}
                  onClick={() => setActiveCategory(cat)}
                  className={activeCategory === cat ? "bg-brand-black text-brand-ivory hover:bg-brand-black/90" : "text-gray-600 hover:text-brand-black hover:bg-brand-beige/50"}
                >
                  {cat}
                </Button>
              ))}
            </div>

            {/* Mobile Filter Toggle */}
            <div className="w-full md:hidden flex justify-between items-center">
              <Button variant="outline" className="border-brand-beige">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <select 
                className="bg-transparent border-none text-sm font-medium focus:ring-0"
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            {/* Sort & View Options */}
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" className="text-gray-600">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <div className="h-6 w-px bg-brand-beige"></div>
              <Button variant="ghost" className="text-gray-600">
                Sort by: Featured <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Product Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-xl text-gray-500 font-medium">No products found in this category.</h3>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
