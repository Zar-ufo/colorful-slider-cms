import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { ChevronRight, Minus, Plus, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductGrid from '@/components/ProductGrid';

// Mock data - in a real app, this would come from Supabase
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Minimalist Ceramic Vase',
    description: 'A beautiful handcrafted ceramic vase with a minimalist design. Each piece is uniquely made by skilled artisans using traditional techniques. The natural finish showcases the beauty of the material while adding an elegant touch to any space.',
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
    description: 'A sleek, modern wall clock with a minimalist face. Crafted from sustainable materials with a precision quartz movement for accurate timekeeping. The simple, elegant design complements any interior style.',
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
    description: 'Soft, natural linen cushion with a minimalist design. Made from premium quality linen for exceptional comfort and durability. The neutral color palette blends seamlessly with any decor.',
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
    description: 'Handcrafted wooden serving bowl made from sustainable oak. Perfect for serving salads, fruits, or snacks. The natural wood grain adds warmth and character to your table setting.',
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
    description: 'Luxurious natural linen bedding set for a comfortable night\'s sleep. Includes a duvet cover and two pillowcases. The breathable linen fabric keeps you cool in the summer and warm in the winter.',
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
    description: 'Elegant ceramic dinner set including plates, bowls, and mugs. Perfect for everyday use or special occasions. The durable ceramic material is dishwasher and microwave safe.',
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
    description: 'Set of soft, absorbent cotton towels in natural colors. Made from 100% pure cotton for maximum comfort and absorbency. The set includes bath towels, hand towels, and washcloths.',
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
    description: 'Elegant marble coffee table with wooden legs. A stylish addition to any living room. The smooth marble top and sturdy wooden legs provide a perfect balance of form and function.',
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

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addItem } = useCart();

  useEffect(() => {
    // In a real app, this would be an API call to get the product by ID
    const foundProduct = mockProducts.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Find related products from the same category
      const productsInSameCategory = mockProducts.filter(
        p => p.id !== id && p.category === foundProduct.category
      );
      setRelatedProducts(productsInSameCategory.slice(0, 4));
    }
    
    // Reset state when product changes
    setQuantity(1);
    setSelectedImageIndex(0);
    
    // Scroll to top when product changes
    window.scrollTo(0, 0);
  }, [id]);

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p>Loading product...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-700">Home</Link>
            <ChevronRight size={14} className="mx-2" />
            <Link to="/products" className="hover:text-gray-700">Products</Link>
            <ChevronRight size={14} className="mx-2" />
            <Link to={`/products?category=${product.category}`} className="hover:text-gray-700">
              {product.category}
            </Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
        
        {/* Product Detail */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={product.images[selectedImageIndex]} 
                  alt={product.name}
                  className="w-full h-full object-cover" 
                />
              </div>
              
              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                        selectedImageIndex === index ? 'border-black' : 'border-transparent'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover" 
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">{product.name}</h1>
              
              <div className="text-2xl font-medium mb-6">{formatPrice(product.price)}</div>
              
              <div className="prose mb-8 text-gray-700">
                <p>{product.description}</p>
              </div>
              
              {/* Quantity Selector */}
              <div className="flex items-center mb-8">
                <span className="mr-4 font-medium">Quantity</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button 
                    onClick={decrementQuantity}
                    className="px-3 py-2 border-r border-gray-300 hover:bg-gray-100"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 min-w-[40px] text-center">{quantity}</span>
                  <button 
                    onClick={incrementQuantity}
                    className="px-3 py-2 border-l border-gray-300 hover:bg-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              {/* Add to Cart Button */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 h-12 text-base"
                >
                  Add to Cart
                </Button>
                <Button variant="outline" className="h-12 px-4">
                  <Heart size={20} />
                </Button>
                <Button variant="outline" className="h-12 px-4">
                  <Share2 size={20} />
                </Button>
              </div>
              
              {/* Product Details */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium">Category</span>
                  <span>{product.category}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium">Material</span>
                  <span>Ceramic, Wood</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium">Dimensions</span>
                  <span>H: 30cm, W: 15cm</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="font-medium">Care</span>
                  <span>Hand wash only</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <ProductGrid
            products={relatedProducts}
            title="You May Also Like"
            subtitle="Products similar to this one"
            columns={2}
            className="py-16 bg-gray-50"
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
