"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Check, Truck, Shield, MessageCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";

interface ProductDetailContentProps {
  product: any;
}

export default function ProductDetailContent({ product }: ProductDetailContentProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();

  return (
    <>
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 bg-white min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          
          <Link href="/collection" className="inline-flex items-center text-sm text-gray-500 hover:text-brand-gold mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Collection
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
            
            {/* Image Gallery */}
            <div className="flex flex-col gap-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative aspect-[3/4] md:aspect-square bg-brand-beige/20 rounded-2xl overflow-hidden"
              >
                <Image
                  src={product.images[activeImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
              
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${activeImage === idx ? 'border-brand-gold' : 'border-transparent hover:border-brand-beige'}`}
                    >
                      <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" sizes="100px" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col"
            >
              <div className="mb-2 text-sm font-semibold tracking-wider text-gray-500 uppercase">
                {product.category}
              </div>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-brand-black mb-4">
                {product.name}
              </h1>
              <div className="text-2xl font-medium text-brand-gold mb-8">
                ₹{product.price.toLocaleString("en-IN")}
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-brand-black">Select Size</span>
                  <button className="text-sm text-gray-500 underline hover:text-brand-gold">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-12 w-12 rounded-full border flex items-center justify-center font-medium transition-all ${
                        selectedSize === size 
                          ? 'border-brand-black bg-brand-black text-white' 
                          : 'border-gray-200 text-brand-black hover:border-brand-gold'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 mb-10">
                <div className="flex gap-4">
                  <Button 
                    size="lg" 
                    className="flex-1 bg-brand-black text-white hover:bg-brand-gold h-14 text-lg"
                    onClick={() => {
                      if (product.sizes.length > 0 && !selectedSize) {
                        alert("Please select a size first!");
                        return;
                      }
                      addToCart(product, selectedSize);
                      alert(`${product.name} added to cart!`);
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button 
                    size="icon" 
                    variant="outline" 
                    className="h-14 w-14 border-gray-200 hover:border-brand-gold hover:text-brand-gold shrink-0"
                  >
                    <Heart className="h-6 w-6" />
                  </Button>
                </div>
                
                {/* WhatsApp Order Button */}
                <a 
                  href={`https://wa.me/918982872622?text=Hi! I am interested in buying ${product.name} (Size: ${selectedSize || 'Not selected'}).`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full h-14 text-lg border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white flex items-center justify-center rounded-lg transition-colors font-medium"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Order via WhatsApp
                </a>
              </div>

              {/* Features & Guarantees */}
              <div className="space-y-4 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="h-5 w-5 text-brand-gold" />
                  <span>Premium Quality Guaranteed</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="h-5 w-5 text-brand-gold" />
                  <span>Express Delivery in Waidhan</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="h-5 w-5 text-brand-gold" />
                  <span>Secure Payment Options</span>
                </div>
              </div>

              {/* Features List */}
              <div className="mt-10">
                <h3 className="font-heading text-xl font-bold mb-4">Product Details</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  {product.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>

            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
