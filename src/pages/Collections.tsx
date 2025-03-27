
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Category, Product } from '@/types';
import ProductGrid from '@/components/ProductGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';

// Mock categories
const mockCategories: Category[] = [
  { id: 'all', name: 'All Collections' },
  { id: 'home', name: 'Home Decor', description: 'Beautiful decor pieces for your living space' },
  { id: 'kitchen', name: 'Kitchen', description: 'Elegant and functional kitchen essentials' },
  { id: 'bedroom', name: 'Bedroom', description: 'Create a tranquil sanctuary with our bedroom collection' },
  { id: 'bath', name: 'Bath', description: 'Elevate your bathroom with our refined bath accessories' },
  { id: 'furniture', name: 'Furniture', description: 'Timeless furniture crafted with sustainable materials' },
];

// Mock products (reusing from Index.tsx)
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

const Collections: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(mockProducts);
    } else {
      const filtered = mockProducts.filter(
        product => product.category.toLowerCase() === selectedCategory
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Collections Header */}
      <div className="bg-gray-50 py-16 mt-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-center mb-4">
            Our Collections
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Explore our thoughtfully curated collections designed to bring 
            elegance and harmony to your living spaces.
          </p>
        </div>
      </div>
      
      <div className="section-container">
        {/* Categories Tabs */}
        <Tabs defaultValue="all" onValueChange={setSelectedCategory} className="w-full max-w-4xl mx-auto mb-16">
          <TabsList className="w-full overflow-x-auto flex justify-start space-x-2 pb-2">
            {mockCategories.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="min-w-fit"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <Separator className="my-6" />
          
          {mockCategories.map(category => (
            <TabsContent key={category.id} value={category.id} className="pt-4">
              {category.description && (
                <p className="text-gray-600 mb-12 max-w-3xl">
                  {category.description}
                </p>
              )}
              
              <ProductGrid 
                products={filteredProducts} 
                columns={3}
              />
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-500">No products found in this collection.</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Collections;
