
import React from 'react';
import { Category } from '@/types';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Mock categories data
const categories: Category[] = [
  { id: '1', name: 'Home', description: 'Home decor and accessories' },
  { id: '2', name: 'Kitchen', description: 'Kitchen essentials and dinnerware' },
  { id: '3', name: 'Bedroom', description: 'Bedding and bedroom accessories' },
  { id: '4', name: 'Bath', description: 'Bath towels and accessories' },
  { id: '5', name: 'Furniture', description: 'Tables, chairs, and other furniture' }
];

interface CategorySectionProps {
  className?: string;
}

const CategorySection: React.FC<CategorySectionProps> = ({ className }) => {
  return (
    <section className={cn("section-container py-12", className)}>
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Shop by Category</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse our curated collection of minimalist products across different categories
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <Link 
            key={category.id}
            to={`/collections?category=${category.name.toLowerCase()}`}
            className="group"
          >
            <div className="bg-gray-100 aspect-square rounded-lg overflow-hidden relative hover:shadow-md transition-shadow">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-4">
                  <h3 className="font-medium text-lg">{category.name}</h3>
                  <p className="text-sm text-gray-600 mt-1 hidden sm:block">{category.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
