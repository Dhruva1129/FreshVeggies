import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { CreditCard, Truck, Check } from 'lucide-react';

interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

interface PaymentMethod {
  type: 'card' | 'cod';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
}

export function Checkout() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCartStore();
  const [step, setStep] = useState<'address' | 'payment' | 'confirmation'>('address');
  const [address, setAddress] = useState<Address>({
    fullName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({ type: 'card' });

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirmation');
    // In a real app, we would process the payment here
    clearCart();
  };

  if (step === 'confirmation') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h2>
        <p className="text-gray-600 mb-8">
          Thank you for your order. We'll send you a confirmation email shortly.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          <div className={`flex items-center ${step === 'address' ? 'text-green-600' : 'text-gray-400'}`}>
            <Truck className="w-6 h-6" />
            <span className="ml-2 font-medium">Delivery</span>
          </div>
          <div className="w-16 h-1 mx-4 bg-gray-200"></div>
          <div className={`flex items-center ${step === 'payment' ? 'text-green-600' : 'text-gray-400'}`}>
            <CreditCard className="w-6 h-6" />
            <span className="ml-2 font-medium">Payment</span>
          </div>
        </div>
      </div>

      {step === 'address' && (
        <form onSubmit={handleAddressSubmit} className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Delivery Address</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                required
                value={address.fullName}
                onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Street Address</label>
              <input
                type="text"
                required
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">State</label>
                <input
                  type="text"
                  required
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                <input
                  type="text"
                  required
                  value={address.zipCode}
                  onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
          >
            Continue to Payment
          </button>
        </form>
      )}

      {step === 'payment' && (
        <form onSubmit={handlePaymentSubmit} className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setPaymentMethod({ type: 'card' })}
                className={`flex-1 p-4 border rounded-lg ${
                  paymentMethod.type === 'card' ? 'border-green-600 bg-green-50' : 'border-gray-300'
                }`}
              >
                <CreditCard className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-medium">Credit/Debit Card</div>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod({ type: 'cod' })}
                className={`flex-1 p-4 border rounded-lg ${
                  paymentMethod.type === 'cod' ? 'border-green-600 bg-green-50' : 'border-gray-300'
                }`}
              >
                <Truck className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-medium">Cash on Delivery</div>
              </button>
            </div>

            {paymentMethod.type === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Card Number</label>
                  <input
                    type="text"
                    required
                    placeholder="1234 5678 9012 3456"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">CVV</label>
                    <input
                      type="text"
                      required
                      placeholder="123"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
              {items.map((item) => (
                <div key={item.vegetable.id} className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{item.vegetable.name} x {item.quantity}</span>
                  <span>${(item.vegetable.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t mt-2 pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              Place Order
            </button>
          </div>
        </form>
      )}
    </div>
  );
}