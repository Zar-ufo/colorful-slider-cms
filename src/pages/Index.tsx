
import React from 'react';
import HeroSlider from '@/components/HeroSlider';
import ProductGrid from '@/components/ProductGrid';
import CategorySection from '@/components/CategorySection';
import { Product } from '@/types';

// Mock featured products data
const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Minimalist Ceramic Vase',
    description: 'A beautiful handcrafted ceramic vase with a minimalist design.',
    price: 79,
    images: [
      'https://images.unsplash.com/photo-1612320648993-61c1cd604b71?ixlib=rb-4.0.3&auto=format&fit=crop&w=942&q=80'
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
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    ],
    category: 'Home',
    featured: false,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Wooden Desk Organizer',
    description: 'Keep your workspace tidy with this wooden desk organizer.',
    price: 49,
    images: [
      'https://images.unsplash.com/photo-1593085260707-5377ba37f868?ixlib=rb-4.0.3&auto=format&fit=crop&w=3000&q=80'
    ],
    category: 'Home',
    featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Linen Throw Pillow',
    description: 'Add a touch of comfort to your sofa with this linen throw pillow.',
    price: 39,
    images: [
      'https://images.unsplash.com/photo-1579656381439-1f598e549c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80'
    ],
    category: 'Home',
    featured: true,
    created_at: new Date().toISOString()
  }
];

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSlider />
      
      {/* Category Section */}
      <CategorySection className="mt-12" />
      
      {/* Featured Products */}
      <ProductGrid 
        products={featuredProducts} 
        title="Featured Products" 
        subtitle="Curated selection of our finest minimalist products"
        columns={4}
        compact={true}
        className="mt-12"
      />
    </div>
  );
};

export default Index;
