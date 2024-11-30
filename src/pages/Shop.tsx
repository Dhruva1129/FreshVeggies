import React, { useState } from 'react';
import { VegetableCard } from '../components/VegetableCard';
import { vegetables } from '../data/vegetables';
import { Search } from 'lucide-react';

export function Shop() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const filteredVegetables = vegetables.filter(
    (veg) =>
      veg.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === 'all' || veg.category === category)
  );

  const categories = ['all', ...new Set(vegetables.map((veg) => veg.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search vegetables..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>

        <div className="mt-4 md:mt-0">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVegetables.map((vegetable) => (
          <VegetableCard key={vegetable.id} vegetable={vegetable} />
        ))}
      </div>
    </div>
  );
}