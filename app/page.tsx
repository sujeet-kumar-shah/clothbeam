"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";

// Mock Data
const featuredProducts = [
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
];

const categories = [
  {
    id: "ethnic",
    name: "Ethnic Wear",
    image: "https://images.unsplash.com/photo-1610189035105-0158fb7e0349?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "casual",
    name: "Casual Wear",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "shirts",
    name: "Premium Shirts",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "wedding",
    name: "Wedding Collection",
    image: "https://images.unsplash.com/photo-1510255823126-1049ea267ce2?q=80&w=600&auto=format&fit=crop",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main className="flex-grow pt-24"> {/* pt-24 to offset sticky navbar */}
        
        {/* Hero Section */}
        <section className="relative h-[85vh] md:h-[90vh] w-full overflow-hidden bg-brand-black">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://picsum.photos/seed/hero/2000/1200"
              alt="Premium Fashion"
              fill
              className="object-cover opacity-60"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4 md:px-6 h-full flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl"
            >
              <h2 className="text-brand-gold text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-4">
                Clothbeam
              </h2>
              <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
                Your Style,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-ivory to-brand-gold">
                  Your Way.
                </span>
              </h1>
              <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-lg mx-auto md:mx-0">
                Discover Waidhan&apos;s most luxurious collection of modern clothing. 
                Tailored for elegance, designed for you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/collection" className="inline-flex items-center justify-center rounded-lg text-white border border-white hover:bg-white hover:text-brand-black text-lg h-14 px-8 transition-colors font-medium">
                  Shop Collection
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center rounded-lg text-white border border-white/50 hover:border-white hover:bg-white/10 text-lg h-14 px-8 transition-colors font-medium">
                  Visit Store
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 md:py-32 bg-brand-ivory">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row justify-between items-end mb-12"
            >
              <div>
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-black mb-4">
                  Shop by <span className="text-brand-gold italic">Category</span>
                </h2>
                <p className="text-gray-600 max-w-md">
                  Explore our curated collections designed to elevate your everyday style and special occasions.
                </p>
              </div>
              <Link href="/collection" className="hidden md:flex items-center text-brand-black font-semibold hover:text-brand-gold transition-colors mt-4 md:mt-0">
                View All Categories <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/collection?category=${category.id}`} className="group block relative overflow-hidden rounded-2xl aspect-[4/5]">
                    <Image
                      src={`https://picsum.photos/seed/${category.id}/600/800`}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center justify-between">
                      <h3 className="font-heading text-2xl font-semibold text-white">{category.name}</h3>
                      <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                        <ArrowRight className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <Link href="/collection" className="md:hidden mt-8 flex items-center justify-center text-brand-black font-semibold">
              View All Categories <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 md:py-32 bg-brand-beige/20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-black mb-4">
                Trending <span className="text-brand-gold italic">Now</span>
              </h2>
              <p className="text-gray-600">
                Discover the pieces everyone is talking about. From elegant kurtas to sharp suits, find your next favorite outfit.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 md:py-32 bg-brand-black text-white overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight">
                  Experience <span className="text-brand-gold italic">Luxury</span> <br />in Waidhan
                </h2>
                <p className="text-gray-300 text-lg">
                  At Clothbeam, we believe that fashion is an expression of identity. We bring the finest fabrics and the most exquisite designs right to your doorstep.
                </p>
                
                <div className="space-y-6">
                  {[
                    { title: "Premium Quality Fabrics", desc: "Sourced globally, crafted to perfection." },
                    { title: "Exclusive Designs", desc: "Unique pieces you won't find anywhere else." },
                    { title: "Personalized Styling", desc: "Expert advice to help you find the perfect look." }
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="h-6 w-6 rounded-full bg-brand-gold/20 flex items-center justify-center shrink-0 mt-1">
                        <div className="h-2 w-2 rounded-full bg-brand-gold"></div>
                      </div>
                      <div>
                        <h4 className="font-heading text-xl font-semibold mb-1">{feature.title}</h4>
                        <p className="text-gray-400">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative h-[600px] rounded-2xl overflow-hidden"
              >
                <Image
                  src="https://picsum.photos/seed/store/1000/800"
                  alt="Store Interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-8 left-8 right-8 bg-brand-black/80 backdrop-blur-md p-8 rounded-xl border border-white/10">
                  <p className="text-xl italic font-heading text-brand-gold mb-2">&quot;The best premium clothing store in the city. Outstanding quality and service!&quot;</p>
                  <p className="text-sm text-gray-300 uppercase tracking-widest">— Rahul S., Waidhan</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      
      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/918982872622" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </>
  );
}
