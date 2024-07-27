import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';
import { add } from '../../redux/slices/cartSlice';
import NavBar from '../NavBar/NavBar';

const SingleProduct = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const { products, status } = useSelector((state) => state.product);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        const product = products?.find(product => product._id === productId);
        if (product) {
            setSelectedProduct(product);
        } else if (status !== 'loading') {
            navigate('/');
        }
    }, [products, productId, navigate, status]);

    const handleClick = () => {
        if (selectedProduct) {
            dispatch(add(selectedProduct));
        }
    };

    if (status === 'loading') return <div className="flex items-center justify-center h-screen text-4xl font-extrabold text-gray-700 animate-pulse">Loading...</div>
    if (status === 'error') return <div className="flex items-center justify-center h-screen text-4xl font-extrabold text-red-600 animate-bounce">Error loading products.</div>
    if (!selectedProduct) return <div className="flex items-center justify-center h-screen text-4xl font-extrabold text-gray-700 animate-pulse">Product not found.</div>

    return (
        <>
            <NavBar />
            <div className="bg-gradient-to-br from-purple-50 to-indigo-100 py-7 flex items-center justify-center">
                <div className="mx-auto px-4 max-w-6xl">
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded overflow-hidden select-none transform transition duration-500 hover:scale-105">
                        <div className="md:flex items-center">
                            <div className="md:flex-shrink-0 w-full md:w-1/2 ">
                                <img
                                    className="w-full object-cover shadow md:h-full p-5 rounded"
                                    src={`${import.meta.env.VITE_API_URI}/${selectedProduct.productImage}`}
                                    alt={selectedProduct.productName}
                                />
                            </div>
                            <div className="p-2 sm:p-8 md:w-1/2">
                                <div className="uppercase tracking-wide text-sm text-purple-500 font-semibold animate-pulse">
                                    {selectedProduct.productCategory}
                                </div>
                                <h2 className="mt-2 text-3xl leading-tight font-bold text-gray-900">
                                    {selectedProduct.productName}
                                </h2>
                                <p className="mt-4 text-gray-600 text-justify hover:line-clamp-none transition-all duration-300">
                                    {selectedProduct.productDesc}
                                </p>
                                <div className='flex items-center justify-between'>
                                    <div className="mt-6 flex items-center">
                                        <span className="text-gray-500 mr-2">Price:</span>
                                        <span className="text-4xl font-extrabold text-purple-500 animate-bounce">₹{selectedProduct.productPrice}</span>
                                    </div>
                                    <div className="mt-4 flex items-center">
                                        <span className="text-gray-500 mr-2">Status:</span>
                                        <span className={`font-semibold ${selectedProduct.status ? 'text-green-500' : 'text-red-500'}`}>
                                            {selectedProduct.status ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleClick}
                                    className={`mt-8 w-full py-3 px-8 font-semibold text-lg rounded-full transition-all duration-300 transform hover:scale-105 ${selectedProduct.status
                                            ? 'bg-purple-500 hover:bg-purple-600 text-white'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                    disabled={!selectedProduct.status}
                                >
                                    {selectedProduct.status ? 'Add to cart' : 'Out of stock'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SingleProduct;