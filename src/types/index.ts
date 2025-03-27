
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  featured: boolean;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  buttonText?: string;
  buttonLink?: string;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'admin' | 'customer';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface SearchResult {
  products: Product[];
  totalCount: number;
}

export interface Order {
  id: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  customer: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  total: number;
  notes?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  created_at: string;
}
