import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';

export function Navbar() {
  const { user, logout } = useAuthStore();
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">FreshVeggies</span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link to="/shop" className="hover:text-green-200">Shop</Link>
            {user ? (
              <>
                <span className="hover:text-green-200">Welcome, {user.name}</span>
                <button
                  onClick={logout}
                  className="flex items-center hover:text-green-200"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="flex items-center hover:text-green-200">
                  <User className="w-5 h-5" />
                </Link>
              </div>
            )}
            <Link to="/cart" className="flex items-center hover:text-green-200 relative">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}