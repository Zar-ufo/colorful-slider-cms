
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import ProductGrid from '@/components/ProductGrid';
import ProductCard from '@/components/ProductCard'; // Add the missing import
import { ArrowRight } from 'lucide-react';
import { Product, HeroSlide } from '@/types';

// Mock data
const mockHeroSlides: HeroSlide[] = [
  {
    id: '1',
    title: 'Timeless Elegance for Modern Living',
    subtitle: 'Our new collection is designed for those who appreciate refined simplicity.',
    imageUrl: 'https://images.unsplash.com/photo-1602810320073-1230c46d89d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    buttonText: 'Explore Collection',
    buttonLink: '/collections'
  },
  {
    id: '2',
    title: 'Crafted with Care',
    subtitle: 'Every piece in our collection is thoughtfully made with sustainable materials.',
    imageUrl: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    buttonText: 'Shop Now',
    buttonLink: '/products'
  },
  {
    id: '3',
    title: 'Elevating Everyday Essentials',
    subtitle: 'Discover beautiful objects that enhance your daily rituals.',
    imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    buttonText: 'View Products',
    buttonLink: '/products'
  }
];

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Minimalist Ceramic Vase',
    description: 'A beautiful handcrafted ceramic vase with a minimalist design.',
    price: 79,
    images: [
      'https://images.unsplash.com/photo-1612320648993-61c1cd604b71?ixlib=rb-4.0.3&auto=format&fit=crop&w=942&q=80', 
      'https://images.unsplash.com/photo-1611486212557-88be5ff6f941?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80'
    ],
    category: 'Home',
    featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Modern Wall Clock',
    description: 'A sleek, modern wall clock with a minimalist face.',
    price: 129,
    images: [
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80'
    ],
    category: 'Home',
    featured: false,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Natural Linen Cushion',
    description: 'Soft, natural linen cushion with a minimalist design.',
    price: 49,
    images: [
      'https://images.unsplash.com/photo-1609799693618-5c99dd47fe12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1493552152660-f915ab47ae9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80'
    ],
    category: 'Home',
    featured: false,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Wooden Serving Bowl',
    description: 'Handcrafted wooden serving bowl made from sustainable oak.',
    price: 69,
    images: [
      'https://images.unsplash.com/photo-1578903600704-811a8f239ecf?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80',
      'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80'
    ],
    category: 'Kitchen',
    featured: false,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Linen Bedding Set',
    description: 'Luxurious natural linen bedding set for a comfortable night\'s sleep.',
    price: 199,
    images: [
      'https://images.unsplash.com/photo-1584096006933-8ab08ce4c29e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    ],
    category: 'Bedroom',
    featured: false,
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Ceramic Dinner Set',
    description: 'Elegant ceramic dinner set including plates, bowls, and mugs.',
    price: 159,
    images: [
      'https://images.unsplash.com/photo-1594282486552-05a3b6fbba1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80',
      'https://images.unsplash.com/photo-1550401732-f7b6c3a196e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80'
    ],
    category: 'Kitchen',
    featured: false,
    created_at: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Pure Cotton Towels',
    description: 'Set of soft, absorbent cotton towels in natural colors.',
    price: 39,
    images: [
      'https://images.unsplash.com/photo-1616627052149-22c4329f6285?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
      'https://images.unsplash.com/photo-1643057752896-b6fb3a85e9c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80'
    ],
    category: 'Bath',
    featured: false,
    created_at: new Date().toISOString()
  },
  {
    id: '8',
    name: 'Marble Coffee Table',
    description: 'Elegant marble coffee table with wooden legs.',
    price: 299,
    images: [
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80'
    ],
    category: 'Furniture',
    featured: true,
    created_at: new Date().toISOString()
  }
];

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);

  useEffect(() => {
    // In a real app, these would be API calls to Supabase
    setFeaturedProducts(mockProducts.filter(product => product.featured));
    
    // Sort by created_at to get newest products
    const sorted = [...mockProducts].sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
    setNewArrivals(sorted.slice(0, 4));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Slider */}
      <HeroSlider slides={mockHeroSlides} />
      
      {/* Featured Collection */}
      <section className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">Featured Collection</h2>
            <p className="text-gray-600">Discover our most popular pieces</p>
          </div>
          <Link 
            to="/products" 
            className="mt-4 md:mt-0 inline-flex items-center text-black font-medium hover:opacity-80 transition-opacity"
          >
            View All Products <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} featured={product.featured} />
          ))}
        </div>
      </section>
      
      {/* Brand Story */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Craftsmanship & Sustainability</h2>
            <p className="text-gray-600 mb-6">
              At HiyoRi, we believe in the beauty of simplicity. Each product in our collection is thoughtfully designed
              and crafted with sustainable materials to create timeless pieces that enhance your everyday rituals.
            </p>
            <p className="text-gray-600 mb-8">
              Our commitment to ethical production means we work closely with skilled artisans who share our vision
              for quality and sustainability.
            </p>
            <Link 
              to="/about" 
              className="inline-flex items-center bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
            >
              Learn More About Us
            </Link>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1488900128323-21503983a07e?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80" 
              alt="Craftsman working" 
              className="rounded-lg shadow-lg z-10 relative"
            />
            <div className="absolute -bottom-6 -left-6 w-2/3 h-24 bg-gray-200 rounded-lg -z-0" />
            <div className="absolute -top-6 -right-6 w-2/3 h-24 bg-gray-300 rounded-lg -z-0" />
          </div>
        </div>
      </section>
      
      {/* New Arrivals */}
      <ProductGrid 
        products={newArrivals}
        title="New Arrivals"
        subtitle="The latest additions to our collection"
        columns={4}
      />
      
      {/* Instagram Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Follow Our Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Join our community and follow along as we share inspiration, behind-the-scenes moments,
            and new product launches.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <a 
                key={i}
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block overflow-hidden group aspect-square"
              >
                <img 
                  src={`https://images.unsplash.com/photo-161${i + 8000000}?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`} 
                  alt={`Instagram post ${i}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </a>
            ))}
          </div>
          
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center mt-10 text-black font-medium hover:opacity-80 transition-opacity"
          >
            @hiyori_home on Instagram <ArrowRight size={16} className="ml-2" />
          </a>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-white/80 mb-8">
            Sign up to receive updates on new product launches, exclusive offers, 
            and inspiration for mindful living.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
            <button 
              type="submit"
              className="bg-white text-black font-medium rounded-full px-6 py-3 hover:bg-opacity-90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;
