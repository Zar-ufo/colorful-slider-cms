
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Package, Users, Settings, LogOut, Plus, Edit, Trash2, 
  Image, Search, Check, X, ArrowUpDown, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { toast } from 'sonner';
import { Product, Category } from '@/types';
import { cn } from '@/lib/utils';

// Mock data (in a real app, this would come from Supabase)
const mockProducts: Product[] = [
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
  // ... more products (using the ones from our Products page)
];

const mockCategories: Category[] = [
  { id: '1', name: 'Home', description: 'Home decor and accessories' },
  { id: '2', name: 'Kitchen', description: 'Kitchen essentials and dinnerware' },
  { id: '3', name: 'Bedroom', description: 'Bedding and bedroom accessories' },
  { id: '4', name: 'Bath', description: 'Bath towels and accessories' },
  { id: '5', name: 'Furniture', description: 'Tables, chairs, and other furniture' }
];

// Admin panel sections
type Section = 'dashboard' | 'products' | 'customers' | 'settings';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  
  // Data states
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  // Modal states
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Search and pagination states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const isAdmin = localStorage.getItem('adminAuthenticated') === 'true';
      
      if (!isAdmin) {
        navigate('/admin-login');
        return;
      }
      
      setIsAuthenticated(true);
      setIsLoading(false);
      
      // In a real app, fetch data from Supabase
      setProducts(mockProducts);
      setCategories(mockCategories);
    };
    
    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    toast.success('Logged out successfully');
    navigate('/admin-login');
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleDeleteProduct = (productId: string) => {
    // In a real app, delete from Supabase
    setProducts(products.filter(p => p.id !== productId));
    toast.success('Product deleted successfully');
  };

  const handleSaveProduct = (product: Product) => {
    // In a real app, save to Supabase
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => p.id === product.id ? product : p));
      toast.success('Product updated successfully');
    } else {
      // Add new product with generated ID
      const newProduct = {
        ...product,
        id: Date.now().toString(),
        created_at: new Date().toISOString()
      };
      setProducts([newProduct, ...products]);
      toast.success('Product added successfully');
    }
    
    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  // Filter products based on search
  const filteredProducts = products.filter(
    product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Redirect handled in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 md:p-6 border-b">
          <h1 className="text-xl font-bold hidden md:block">HiyoRi Admin</h1>
          <h1 className="text-xl font-bold md:hidden">H</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveSection('dashboard')}
            className={cn(
              "flex items-center w-full p-3 rounded-lg transition-colors",
              activeSection === 'dashboard' 
                ? "bg-black text-white" 
                : "hover:bg-gray-100"
            )}
          >
            <Home size={20} />
            <span className="ml-3 hidden md:inline">Dashboard</span>
          </button>
          
          <button
            onClick={() => setActiveSection('products')}
            className={cn(
              "flex items-center w-full p-3 rounded-lg transition-colors",
              activeSection === 'products' 
                ? "bg-black text-white" 
                : "hover:bg-gray-100"
            )}
          >
            <Package size={20} />
            <span className="ml-3 hidden md:inline">Products</span>
          </button>
          
          <button
            onClick={() => setActiveSection('customers')}
            className={cn(
              "flex items-center w-full p-3 rounded-lg transition-colors",
              activeSection === 'customers' 
                ? "bg-black text-white" 
                : "hover:bg-gray-100"
            )}
          >
            <Users size={20} />
            <span className="ml-3 hidden md:inline">Customers</span>
          </button>
          
          <button
            onClick={() => setActiveSection('settings')}
            className={cn(
              "flex items-center w-full p-3 rounded-lg transition-colors",
              activeSection === 'settings' 
                ? "bg-black text-white" 
                : "hover:bg-gray-100"
            )}
          >
            <Settings size={20} />
            <span className="ml-3 hidden md:inline">Settings</span>
          </button>
        </nav>
        
        <div className="p-4 mt-auto border-t">
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="ml-3 hidden md:inline">Logout</span>
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Dashboard Section */}
        {activeSection === 'dashboard' && (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium mb-2">Total Products</h3>
                <p className="text-3xl font-bold">{products.length}</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium mb-2">Categories</h3>
                <p className="text-3xl font-bold">{categories.length}</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium mb-2">Featured Products</h3>
                <p className="text-3xl font-bold">
                  {products.filter(p => p.featured).length}
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Recent Products</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Name</th>
                      <th className="text-left py-3 px-2">Category</th>
                      <th className="text-left py-3 px-2">Price</th>
                      <th className="text-left py-3 px-2">Featured</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.slice(0, 5).map(product => (
                      <tr key={product.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-2">{product.name}</td>
                        <td className="py-3 px-2">{product.category}</td>
                        <td className="py-3 px-2">${product.price}</td>
                        <td className="py-3 px-2">
                          {product.featured ? (
                            <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                              Featured
                            </span>
                          ) : (
                            <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                              Regular
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {/* Products Section */}
        {activeSection === 'products' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Products</h1>
              <button
                onClick={handleAddProduct}
                className="bg-black text-white px-4 py-2 rounded-lg flex items-center"
              >
                <Plus size={18} className="mr-2" /> Add Product
              </button>
            </div>
            
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
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
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="text-left py-3 px-4">Image</th>
                      <th className="text-left py-3 px-4">
                        <button className="flex items-center">
                          Name <ArrowUpDown size={14} className="ml-1" />
                        </button>
                      </th>
                      <th className="text-left py-3 px-4">Category</th>
                      <th className="text-left py-3 px-4">
                        <button className="flex items-center">
                          Price <ArrowUpDown size={14} className="ml-1" />
                        </button>
                      </th>
                      <th className="text-left py-3 px-4">Featured</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProducts.map(product => (
                      <tr key={product.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                            {product.images[0] ? (
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="flex items-center justify-center w-full h-full text-gray-400">
                                <Image size={16} />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium">{product.name}</td>
                        <td className="py-3 px-4">{product.category}</td>
                        <td className="py-3 px-4">${product.price}</td>
                        <td className="py-3 px-4">
                          {product.featured ? (
                            <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                              Featured
                            </span>
                          ) : (
                            <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                              Regular
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                              aria-label="Edit"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                              aria-label="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    
                    {currentProducts.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-gray-500">
                          {searchQuery ? 'No products found matching your search.' : 'No products available.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="py-4 px-6 bg-gray-50 border-t flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Showing {(currentPage - 1) * itemsPerPage + 1}-
                    {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Customers Section (placeholder) */}
        {activeSection === 'customers' && (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Customers</h1>
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600">Customer management features coming soon.</p>
            </div>
          </div>
        )}
        
        {/* Settings Section (placeholder) */}
        {activeSection === 'settings' && (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600">Store settings features coming soon.</p>
            </div>
          </div>
        )}
      </main>
      
      {/* Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Product Form (simplified) */}
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    defaultValue={editingProduct?.name}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter product name"
                  />
                </div>
                
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    defaultValue={editingProduct?.price}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="0.00"
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    defaultValue={editingProduct?.category}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    defaultValue={editingProduct?.description}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter product description"
                  ></textarea>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="featured"
                    type="checkbox"
                    defaultChecked={editingProduct?.featured}
                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                    Featured Product
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Images
                  </label>
                  {/* Image upload placeholder */}
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                    <Image size={24} className="mx-auto text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Drag and drop image files, or click to select files
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      (Image upload functionality would be implemented with Supabase Storage)
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end space-x-3">
                <button
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Mock save operation with current product data
                    const savedProduct: Product = editingProduct
                      ? { ...editingProduct }
                      : {
                          id: '0',
                          name: 'New Test Product',
                          description: 'Product description',
                          price: 99,
                          images: ['https://images.unsplash.com/photo-1612320648993-61c1cd604b71'],
                          category: 'Home',
                          featured: false,
                          created_at: new Date().toISOString()
                        };
                        
                    handleSaveProduct(savedProduct);
                  }}
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
