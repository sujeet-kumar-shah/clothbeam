"use client";

import NextImage from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function About() {
  return (
    <>
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 bg-brand-ivory min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          
          {/* Header */}
          <div className="text-center mb-16 md:mb-24">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-4xl md:text-6xl font-bold text-brand-black mb-6"
            >
              Our <span className="text-brand-gold italic">Story</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto"
            >
              Redefining luxury fashion in Waidhan. We believe that what you wear is a reflection of who you are.
            </motion.p>
          </div>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-12 xl:gap-20 items-center mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
            >
              <NextImage
                src="https://picsum.photos/seed/legacy/1000/1200"
                alt="Clothbeam Store"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-brand-black/10"></div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-black mb-4">
                  The Clothbeam <span className="text-brand-gold italic">Legacy</span>
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Founded with a passion for exquisite design and uncompromising quality, Clothbeam brings global fashion standards to Waidhan. Our journey started with a simple vision: to provide a truly luxurious shopping experience right here in our city.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-semibold text-brand-black mb-4">Our Commitment</h3>
                <ul className="space-y-4">
                  {[
                    "Sourcing the finest fabrics from top weavers.",
                    "Collaborating with master tailors for precision fits.",
                    "Providing personalized styling and unmatched customer service.",
                    "Bringing the latest trends while honoring classic traditions."
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-brand-gold shrink-0" />
                      <span className="text-gray-700 text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Store Interior Showcase */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-brand-black text-white rounded-3xl overflow-hidden relative"
          >
            <div className="grid lg:grid-cols-2">
              <div className="p-12 md:p-20 flex flex-col justify-center">
                <h2 className="font-heading text-4xl font-bold mb-6">
                  Visit Our <span className="text-brand-gold italic">Boutique</span>
                </h2>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  Step into a world of elegance. Our flagship store in Waidhan is designed to provide a serene and premium shopping environment. Browse our collections at your leisure, consult with our stylists, and enjoy the Clothbeam experience.
                </p>
                <div className="grid grid-cols-2 gap-8 mt-4">
                  <div>
                    <h4 className="font-bold text-xl text-brand-gold mb-2">1000+</h4>
                    <p className="text-gray-400">Exclusive Designs</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-brand-gold mb-2">100%</h4>
                    <p className="text-gray-400">Quality Assured</p>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px] lg:h-auto">
                <NextImage
                  src="https://picsum.photos/seed/boutique/1000/1000"
                  alt="Premium Store Interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </>
  );
}
