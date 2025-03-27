
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import CheckoutForm from '@/components/CheckoutForm';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  // Redirect if not authenticated or cart is empty
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin-login', { state: { from: '/checkout' } });
    } else if (items.length === 0) {
      navigate('/products');
    }
  }, [isAuthenticated, items.length, navigate]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-10">
        <Link to="/products" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft size={16} className="mr-2" />
          Back to shopping
        </Link>
        
        <h1 className="text-3xl font-display font-bold mb-8">Checkout</h1>
        
        <CheckoutForm />
      </div>
    </div>
  );
};

export default Checkout;
