import React from 'react';
import { remove, increaseQuantity, decreaseQuantity } from '../../redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaShoppingCart, FaPlus, FaMinus } from 'react-icons/fa';

const Cart = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { role, auth } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRemove = (id) => {
        dispatch(remove(id));
    };

    const handleIncrease = (id) => {
        dispatch(increaseQuantity(id));
    };

    const handleDecrease = (id) => {
        dispatch(decreaseQuantity(id));
    };

    const totalSum = cartItems.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);

    const handleCheckout = async () => {
        if (totalSum === 0) {
            alert("Your cart is empty. Add items before checking out.");
            return;
        }

        if (auth) {
            if (role === "admin") {
                return alert("Please Login with Customer Account")
            }
            navigate("/checkout")
        } else {
            alert("Please Login...")
        }
    }

    const reversedCartItems = [...cartItems].reverse();

    return (
        <div className="bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800">
                    <FaShoppingCart className="inline-block mr-4 mb-1" />
                    Your Shopping Cart
                </h1>
                {reversedCartItems.length === 0 ? (
                    <div className="bg-white p-12 rounded-2xl shadow-xl text-center">
                        <p className="text-2xl font-bold text-purple-700">Your cart is empty.</p>
                        <button 
                            onClick={() => navigate('/')} 
                            className="mt-6 px-6 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {reversedCartItems.map((item) => (
                            <div key={item._id} className="bg-white shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                                <div className="md:flex">
                                    <div className="md:flex-shrink-0 h-52">
                                        <img src={`${import.meta.env.VITE_API_URI}/${item.productImage}`} alt={item.productName} className=" w-full object-cover md:w-48" />
                                    </div>
                                    <div className="p-8 w-">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h2 className="text-2xl font-semibold md:text-purple-900 text-white mb-2">{item.productName}</h2>
                                                <p className="md:text-purple-900 text-white mb-2 capitalize">Category: {item.productCategory}</p>
                                            </div>
                                            <p className="text-4xl font-extrabold md:text-purple-900 text-white">₹{item.productPrice}</p>
                                        </div>
                                        <p className="md:text-gray-600 text-white  mb-4 line-clamp-2">{item.productDesc}</p>
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center space-x-4">
                                                <button onClick={() => handleDecrease(item._id)} className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-xl font-bold text-purple-700 hover:bg-purple-200 transition-colors">
                                                    <FaMinus />
                                                </button>
                                                <span className="text-xl font-semibold text-purple-900">{item.quantity}</span>
                                                <button onClick={() => handleIncrease(item._id)} className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-xl font-bold text-purple-700 hover:bg-purple-200 transition-colors">
                                                    <FaPlus />
                                                </button>
                                            </div>
                                            <button onClick={() => handleRemove(item._id)} className="px-6 py-2 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition-colors flex items-center">
                                                <FaTrash className="mr-2" /> Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="mt-12 bg-white shadow-xl rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center">
                    <h2 className="text-4xl font-extrabold text-purple-900 mb-4 md:mb-0">Total: <span className="text-purple-900">₹{totalSum.toFixed(2)}</span></h2>
                    <button
                        className={`px-8 py-3 text-lg font-semibold text-white rounded-full shadow-lg transition-colors ${
                            totalSum === 0
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-purple-600 hover:bg-purple-700'
                        }`}
                        onClick={handleCheckout}
                        disabled={totalSum === 0}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;