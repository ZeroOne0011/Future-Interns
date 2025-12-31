"use client";
import React from 'react';
import Link from 'next/link'; 
import Image from 'next/image'; // Added Image import for Next.js optimization

// --- MOCK CMS DATA ---
const BRAND_DATA = {
  name: "FutureKicks",
  tagline: "Run Beyond Reality.",
  primaryColor: "text-indigo-600",
  buttonColor: "bg-indigo-600 hover:bg-indigo-700",
  heroImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
  products: [
    { id: 1, name: "Neon Velocity", price: "$149", category: "Running", img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&auto=format&fit=crop" },
    { id: 2, name: "Cyber Walker", price: "$189", category: "Lifestyle", img: "https://images.unsplash.com/photo-1560769629-975e13b51880?w=500&auto=format&fit=crop" },
    { id: 3, name: "Aero Glide", price: "$129", category: "Sport", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop" },
  ]
};

// --- COMPONENTS ---

const Navbar = () => (
  <nav className="flex justify-between items-center p-6 bg-white shadow-sm sticky top-0 z-50">
    <div className="text-2xl font-bold tracking-tighter">
      {BRAND_DATA.name}<span className={BRAND_DATA.primaryColor}>.AI</span>
    </div>
    <div className="hidden md:flex space-x-8 text-gray-600 font-medium">
      <Link href="#" className="hover:text-black transition">Men</Link>
      <Link href="#" className="hover:text-black transition">Women</Link>
      <Link href="#" className="hover:text-black transition">New Arrivals</Link>
    </div>
    <button className={`px-5 py-2 text-white rounded-full text-sm font-semibold transition ${BRAND_DATA.buttonColor}`}>
      Shop Now
    </button>
  </nav>
);

const Hero = () => (
  <section className="relative h-[85vh] flex items-center justify-center bg-gray-50 overflow-hidden">
    {/* Abstract Background Element */}
    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-400 via-gray-100 to-white"></div>
    
    <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
      <div className="space-y-6">
        <span className={`uppercase tracking-widest text-xs font-bold ${BRAND_DATA.primaryColor}`}>
          Rebranded with Artificial Intelligence
        </span>
        <h1 className="text-6xl md:text-8xl font-black leading-tight text-gray-900">
          FUTURE <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">READY.</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-md">
          {BRAND_DATA.tagline} Experience the next generation of footwear designed by algorithms, refined by humans.
        </p>
        <div className="flex space-x-4">
          <button className={`px-8 py-4 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 ${BRAND_DATA.buttonColor}`}>
            Explore Collection
          </button>
          <button className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition">
            View Lookbook
          </button>
        </div>
      </div>
      
      {/* Hero Image Area */}
      <div className="relative w-full h-[500px]">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full blur-[100px] opacity-30 animate-pulse"></div>
        {/* Fixed: Used Next.js Image component with unoptimized prop for external URL support */}
        <Image 
          src={BRAND_DATA.heroImage} 
          alt="Hero Shoe" 
          fill
          unoptimized
          className="object-contain drop-shadow-2xl hover:scale-105 transition duration-700 ease-in-out"
        />
      </div>
    </div>
  </section>
);

const ProductCard = ({ product }) => (
  <div className="group bg-white rounded-2xl p-4 cursor-pointer hover:shadow-2xl transition duration-300 border border-transparent hover:border-indigo-100">
    <div className="relative overflow-hidden rounded-xl bg-gray-100 h-64 mb-4">
      {/* Fixed: Used Next.js Image component */}
      <Image 
        src={product.img} 
        alt={product.name} 
        fill
        unoptimized
        className="object-cover group-hover:scale-110 transition duration-500"
      />
      <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-bold shadow-sm z-10">
        {product.category}
      </div>
    </div>
    <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
    <p className="text-gray-500 mt-1">{product.price}</p>
    <button className="mt-4 w-full py-2 rounded-lg border border-gray-200 text-sm font-semibold hover:bg-black hover:text-white transition">
      Add to Cart
    </button>
  </div>
);

const Features = () => (
  <section className="py-20 bg-black text-white">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-4xl font-bold mb-12">Designed by Data.</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: "AI Cushioning", desc: "Soles generated for perfect impact distribution." },
          { title: "Smart Fabrics", desc: "Materials that adapt to your body temperature." },
          { title: "Carbon Neutral", desc: "Manufactured with 0% waste using AI logistics." }
        ].map((feature, idx) => (
          <div key={idx} className="p-8 border border-gray-800 rounded-2xl hover:bg-gray-900 transition">
            <h3 className="text-xl font-bold mb-3 text-indigo-400">{feature.title}</h3>
            <p className="text-gray-400">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-white py-12 border-t border-gray-100">
    <div className="container mx-auto px-6 text-center text-gray-400">
      <p>&copy; 2024 {BRAND_DATA.name}. Rebranded Concept Demo.</p>
    </div>
  </footer>
);

// --- MAIN PAGE LAYOUT ---

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      <section className="container mx-auto px-6 py-24">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-bold">Trending Now</h2>
          <Link href="#" className="text-indigo-600 font-semibold hover:underline">View All -{'>'}</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {BRAND_DATA.products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <Features />
      <Footer />
    </main>
  );
}