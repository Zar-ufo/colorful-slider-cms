
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { ShoppingBag, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { id, name, price, images, category } = product;

  // Format price
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

  // Handle image swap on hover
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (images.length > 1) {
      setCurrentImageIndex(1);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(0);
  };

  return (
    <div 
      className={cn(
        "group relative overflow-hidden transition-all duration-300",
        featured ? "col-span-2 row-span-2" : ""
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/products/${id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          {/* Product Images */}
          <img
            src={images[currentImageIndex]}
            alt={name}
            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
          />

          {/* Category Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-block px-3 py-1 text-xs bg-white/80 backdrop-blur-sm rounded-full">
              {category}
            </span>
          </div>

          {/* Quick Actions */}
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm p-4 flex justify-between items-center transition-all duration-300",
              isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            )}
          >
            <button className="text-black hover:text-gray-700 transition-colors">
              <Heart size={20} />
            </button>
            <button className="bg-black text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors">
              <ShoppingBag size={16} />
              <span className="text-sm font-medium">Add to Bag</span>
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="py-4">
          <h3 className="text-base font-medium mb-1 group-hover:underline transition-all">
            {name}
          </h3>
          <p className="text-gray-900 font-medium">{formattedPrice}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
