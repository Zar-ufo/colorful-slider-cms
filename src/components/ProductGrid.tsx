
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';
import { cn } from '@/lib/utils';

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  columns?: 2 | 3 | 4;
  className?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  title,
  subtitle,
  columns = 4,
  className,
}) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className={cn("section-container", className)}>
      {/* Section Header */}
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{title}</h2>
          )}
          {subtitle && (
            <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
      )}

      {/* Products Grid */}
      <div 
        className={cn(
          "grid gap-6 sm:gap-8",
          columns === 2 && "grid-cols-1 sm:grid-cols-2",
          columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
          columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        )}
      >
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            featured={product.featured}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
