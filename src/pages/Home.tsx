import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <Leaf className="w-16 h-16 text-green-600 mx-auto" />
          <h1 className="mt-4 text-4xl font-bold text-gray-900 sm:text-6xl">
            Fresh Vegetables Delivered
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Get farm-fresh vegetables delivered right to your doorstep. Quality produce for your healthy lifestyle.
          </p>
          <div className="mt-10">
            <Link
              to="/shop"
              className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <h3 className="text-xl font-semibold text-gray-900">Fresh & Organic</h3>
            <p className="mt-2 text-gray-600">
              All our vegetables are freshly harvested and 100% organic.
            </p>
          </div>
          <div className="text-center p-6">
            <h3 className="text-xl font-semibold text-gray-900">Fast Delivery</h3>
            <p className="mt-2 text-gray-600">
              Same-day delivery available for orders placed before 2 PM.
            </p>
          </div>
          <div className="text-center p-6">
            <h3 className="text-xl font-semibold text-gray-900">Best Prices</h3>
            <p className="mt-2 text-gray-600">
              Competitive prices with regular deals and discounts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}