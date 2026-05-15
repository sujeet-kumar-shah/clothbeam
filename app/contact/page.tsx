"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";

export default function Contact() {
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
              Get in <span className="text-brand-gold italic">Touch</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto"
            >
              We&apos;re here to assist you. Reach out for styling advice, order inquiries, or just to say hello.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 xl:gap-24 mb-24">
            
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              <div>
                <h2 className="font-heading text-3xl font-bold text-brand-black mb-8">Visit Our Store</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-brand-black flex items-center justify-center shrink-0">
                      <MapPin className="h-6 w-6 text-brand-gold" />
                    </div>
                    <div>
                      <h4 className="font-heading text-xl font-semibold mb-2">Location</h4>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        Clothbeam,<br />
                        Shop No 01, In Campus of Hotel GS Plaza,<br />
                        near State Bank, Waidhan,<br />
                        Madhya Pradesh 486886
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-brand-black flex items-center justify-center shrink-0">
                      <Clock className="h-6 w-6 text-brand-gold" />
                    </div>
                    <div>
                      <h4 className="font-heading text-xl font-semibold mb-2">Opening Hours</h4>
                      <p className="text-gray-600 text-lg">
                        Monday - Saturday: 10:00 AM - 9:00 PM<br />
                        Sunday: 11:00 AM - 8:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-brand-black flex items-center justify-center shrink-0">
                      <Phone className="h-6 w-6 text-brand-gold" />
                    </div>
                    <div>
                      <h4 className="font-heading text-xl font-semibold mb-2">Contact</h4>
                      <p className="text-gray-600 text-lg mb-1">+91 89828 72622</p>
                      <p className="text-gray-600 text-lg">contact@clothbeam.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Action */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-heading text-2xl font-semibold mb-4">Instant Support</h3>
                <p className="text-gray-600 mb-6">Need quick assistance? Message us directly on WhatsApp for immediate responses.</p>
                <Button size="lg" className="w-full bg-[#25D366] hover:bg-[#20b958] text-white h-14 text-lg">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat on WhatsApp
                </Button>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-brand-black/5 border border-brand-beige/50"
            >
              <h2 className="font-heading text-3xl font-bold text-brand-black mb-8">Send a Message</h2>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-brand-black">First Name</label>
                    <Input placeholder="John" className="h-12 bg-gray-50 border-gray-200 focus:border-brand-gold focus:ring-brand-gold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-brand-black">Last Name</label>
                    <Input placeholder="Doe" className="h-12 bg-gray-50 border-gray-200 focus:border-brand-gold focus:ring-brand-gold" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-black">Email Address</label>
                  <Input type="email" placeholder="john@example.com" className="h-12 bg-gray-50 border-gray-200 focus:border-brand-gold focus:ring-brand-gold" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-black">Phone Number</label>
                  <Input type="tel" placeholder="+91 89828 72622" className="h-12 bg-gray-50 border-gray-200 focus:border-brand-gold focus:ring-brand-gold" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-black">Message</label>
                  <textarea 
                    placeholder="How can we help you?" 
                    className="w-full min-h-[150px] p-4 rounded-md border border-gray-200 bg-gray-50 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none resize-y"
                  ></textarea>
                </div>
                
                <Button type="submit" size="lg" className="w-full bg-brand-black text-white hover:bg-brand-gold h-14 text-lg mt-4">
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </Button>
              </form>
            </motion.div>

          </div>

          {/* Map Embed Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full h-[500px] bg-gray-200 rounded-3xl overflow-hidden relative"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d910.7457946806677!2d82.62536399999999!3d24.0668969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398f37004946e483%3A0x39c6c7be79ae0f4a!2sClothbeam!5e0!3m2!1sen!2sin!4v1778782492872!5m2!1sen!2sin" 
              className="w-full h-full" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>

        </div>
      </main>

      <Footer />
    </>
  );
}
