
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Product, Category } from '@/types';
import { Slider, Search, X, Filter } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

// Mock data - in a real app, this would come from Supabase
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

const mockCategories: Category[] = [
  { id: '1', name: 'All Products' },
  { id: '2', name: 'Home' },
  { id: '3', name: 'Kitchen' },
  { id: '4', name: 'Bedroom' },
  { id: '5', name: 'Bath' },
  { id: '6', name: 'Furniture' }
];

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [sortOption, setSortOption] = useState<string>('newest');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState<boolean>(false);
  
  const isMobile = useIsMobile();

  // Fetch products and categories
  useEffect(() => {
    // In a real app, these would be API calls to Supabase
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...products];
    
    // Filter by category
    if (selectedCategory !== 'All Products') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by price range
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortOption) {
      case 'newest':
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-a-z':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-z-a':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    
    setFilteredProducts(result);
  }, [products, selectedCategory, searchQuery, priceRange, sortOption]);

  // Toggle filter panel for mobile
  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-24 pb-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Shop All Products</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our collection of thoughtfully designed home essentials.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Panel - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map(category => (
                    <li key={category.id}>
                      <button
                        onClick={() => setSelectedCategory(category.name)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-md transition-colors",
                          selectedCategory === category.name
                            ? "bg-black text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        )}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Price Range</h3>
                <div className="px-3">
                  <div className="flex justify-between mb-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="300"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Sort By</h3>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="name-a-z">Name: A to Z</option>
                  <option value="name-z-a">Name: Z to A</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Products and Mobile Filter */}
          <div className="flex-1">
            {/* Mobile Filter Panel Toggle */}
            <div className="lg:hidden flex justify-between items-center mb-6">
              <button
                onClick={toggleFilterPanel}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md"
              >
                <Filter size={18} /> Filters
              </button>
              
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="newest">Newest</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name-a-z">Name: A to Z</option>
                <option value="name-z-a">Name: Z to A</option>
              </select>
            </div>
            
            {/* Mobile Filter Panel */}
            <div
              className={cn(
                "lg:hidden fixed inset-0 bg-white z-50 p-6 transform transition-transform duration-300 ease-in-out",
                isFilterPanelOpen ? "translate-x-0" : "translate-x-full"
              )}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <button onClick={toggleFilterPanel}>
                  <X size={24} />
                </button>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map(category => (
                    <li key={category.id}>
                      <button
                        onClick={() => {
                          setSelectedCategory(category.name);
                          if (isMobile) setIsFilterPanelOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-md transition-colors",
                          selectedCategory === category.name
                            ? "bg-black text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        )}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Price Range</h3>
                <div className="px-3">
                  <div className="flex justify-between mb-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="300"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
              
              <button
                onClick={toggleFilterPanel}
                className="w-full py-3 bg-black text-white rounded-md mt-auto"
              >
                Apply Filters
              </button>
            </div>
            
            {/* Search Bar */}
            <div className="relative mb-8">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            
            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No products found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All Products');
                    setPriceRange([0, 300]);
                  }}
                  className="mt-4 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;
