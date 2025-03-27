
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Cart from './Cart';
import AuthButtons from './AuthButtons';
import SearchDialog from './SearchDialog';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Collections', href: '/collections' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        scrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/"
          className="text-xl md:text-2xl font-display font-bold tracking-tight"
        >
          HiyoRi
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                'text-sm font-medium transition-all duration-200 hover:opacity-70',
                location.pathname === link.href ? 'opacity-100' : 'opacity-80'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-6">
          <SearchDialog />
          <AuthButtons />
          <Cart />
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <div
          className={cn(
            'fixed inset-0 bg-white z-50 flex flex-col p-6 md:hidden transform transition-transform duration-300 ease-in-out',
            isOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="text-xl font-bold" onClick={() => setIsOpen(false)}>
              HiyoRi
            </Link>
            <button onClick={() => setIsOpen(false)}>
              <X size={24} />
            </button>
          </div>
          
          <nav className="flex flex-col space-y-6 text-lg">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  'transition-colors py-2',
                  location.pathname === link.href ? 'font-medium' : 'text-gray-600'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className="mt-auto flex items-center space-x-6 pt-8 border-t border-gray-100">
            <SearchDialog />
            <AuthButtons />
            <Cart />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
