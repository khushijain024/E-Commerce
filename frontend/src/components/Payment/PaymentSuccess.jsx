import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart } from '../../redux/slices/cartSlice';

const PaymentSuccess = () => {
    const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCart());
    // alert('Payment successful! Your order has been placed.');
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-900">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full text-center">
        <svg className="w-24 h-24 mx-auto mb-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2l4 -4m0 0a9 9 0 1 1 -4 0" /> </svg>
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your payment was successful and your order is being processed.
        </p>
        <Link to="/" className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;