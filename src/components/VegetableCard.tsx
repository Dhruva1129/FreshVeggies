import React from 'react';
import { useCartStore } from '../store/cartStore';
import { Vegetable } from '../types';
import { ShoppingCart } from 'lucide-react';

interface VegetableCardProps {
  vegetable: Vegetable;
}

export function VegetableCard({ vegetable }: VegetableCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img
        src={vegetable.image}
        alt={vegetable.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{vegetable.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{vegetable.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-green-600 font-bold">${vegetable.price.toFixed(2)}/{vegetable.unit}</span>
          <button
            onClick={() => addItem(vegetable)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}