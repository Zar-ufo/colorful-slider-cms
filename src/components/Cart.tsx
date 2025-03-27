
import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, totalItems, subtotal } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="relative opacity-80 hover:opacity-100 transition-opacity">
          <ShoppingBag size={20} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full">
        <SheetHeader>
          <SheetTitle className="text-xl font-display">Your Cart</SheetTitle>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4 py-12">
            <div className="bg-gray-100 p-6 rounded-full">
              <ShoppingBag size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium">Your cart is empty</h3>
            <p className="text-gray-500 text-center max-w-xs">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button onClick={() => setIsOpen(false)} className="mt-4" asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col h-full">
            <div className="flex-1 overflow-auto py-4 space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.product.name}</h4>
                    <p className="text-gray-500 text-sm">{formatCurrency(item.product.price)}</p>
                    <div className="flex items-center mt-2">
                      <button 
                        onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        className="p-1 border rounded-full"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="mx-3 min-w-[20px] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 border rounded-full"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button 
                      onClick={() => removeItem(item.product.id)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X size={18} />
                    </button>
                    <span className="font-medium">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-auto pt-4 border-t">
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between py-2 text-lg font-medium">
                <span>Total</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <Button className="w-full mt-6">
                Proceed to Checkout
              </Button>
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={() => setIsOpen(false)}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
