import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../redux/slices/cartSlice';
import { fetchProducts, STATUES } from '../../redux/slices/productSlice';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

const Products = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, status } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);


    const handleClick = (data) => {
        dispatch(add(data));
    };

    const handleProductClick = (productId) => {
        console.log(productId);
        navigate(`/product/${productId}`);
    };


    if (status === STATUES.LOADING) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <div className='text-4xl font-extrabold text-gray-700 animate-pulse'>Loading...</div>
            </div>
        );
    }

    return (
        <>
            <NavBar />
            <div className="px-4 py-8 bg-gradient-to-br from-purple-50 to-indigo-100">
                <h1 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">All Products List</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 select-none'>
                    {products?.map((item) => (
                        <div
                            key={item._id}
                            className='bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1'
                        >
                            <div
                                onClick={() => handleProductClick(item._id)}
                                className='cursor-pointer'
                            >
                                <div className="aspect-w-1 aspect-h-1 w-full h-[60vh] overflow-hidden">
                                    <img
                                        src={`${import.meta.env.VITE_API_URI}/${item.productImage}`}
                                        alt={item.productName}
                                        className='object-cover object-center w-full h-full'
                                    />

                                </div>
                                <div className="p-4">
                                    <h4 className='text-lg font-semibold text-gray-800 line-clamp-1'>{item.productName}</h4>
                                    <p className='text-gray-600 mt-2'>
                                        ₹ <span className='font-bold text-gray-800'>{item.productPrice}</span>
                                    </p>
                                </div>
                            </div>
                            <div className='px-4 pb-4'>
                                <button
                                    onClick={() => { handleClick(item) }}
                                    className={`w-full py-2 px-4 rounded-full font-semibold transition-colors duration-300 ${item.status
                                        ? 'bg-purple-500 hover:bg-purple-600 text-white'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                    disabled={!item.status}
                                >
                                    {item.status ? 'Add to cart' : 'Out of stock'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Products;