import React, { useState, useEffect } from 'react';
import { Search, X, Loader2, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Product } from '@/types';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Mock products data
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

const SearchDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      
      // In a real app, this would be an API call
      const results = mockProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      // Simulate API call delay
      setTimeout(() => {
        setSearchResults(results);
        setIsLoading(false);
      }, 500);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const handleProductSelect = (productId: string) => {
    navigate(`/products/${productId}`);
    setOpen(false);
  };

  const handleViewAllResults = () => {
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="opacity-80 hover:opacity-100 transition-opacity">
          <Search size={20} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] p-0">
        <Command className="rounded-lg border shadow-md">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput
              placeholder="Search products..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="opacity-50 hover:opacity-100">
                <X size={16} />
              </button>
            )}
          </div>
          <CommandList>
            {isLoading ? (
              <div className="py-6 text-center">
                <Loader2 className="h-6 w-6 animate-spin mx-auto text-gray-400" />
                <p className="text-sm text-gray-500 mt-2">Searching...</p>
              </div>
            ) : (
              <>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Products">
                  {searchResults.slice(0, 5).map((product) => (
                    <CommandItem
                      key={product.id}
                      onSelect={() => handleProductSelect(product.id)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                          <img 
                            src={product.images[0]} 
                            alt={product.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{product.name}</p>
                          <p className="text-xs text-gray-500 truncate">{product.category}</p>
                        </div>
                        <div className="flex-shrink-0 font-medium">
                          ${product.price}
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                  
                  {searchResults.length > 5 && (
                    <CommandItem 
                      onSelect={handleViewAllResults}
                      className="justify-center text-sm text-blue-600"
                    >
                      View all {searchResults.length} results
                      <ArrowRight size={14} className="ml-1" />
                    </CommandItem>
                  )}
                </CommandGroup>
                {searchQuery && searchResults.length > 0 && (
                  <CommandGroup heading="Categories">
                    {Array.from(new Set(searchResults.map(product => product.category)))
                      .slice(0, 3)
                      .map(category => (
                        <CommandItem
                          key={category}
                          onSelect={() => navigate(`/products?category=${encodeURIComponent(category)}`)}
                          className="cursor-pointer"
                        >
                          <span>{category}</span>
                        </CommandItem>
                      ))
                    }
                  </CommandGroup>
                )}
              </>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
