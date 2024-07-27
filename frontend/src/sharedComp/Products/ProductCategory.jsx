import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';
import { add } from '../../redux/slices/cartSlice';
import NavBar from '../NavBar/NavBar';

const ProductCategory = () => {
    const { category } = useParams();
    const dispatch = useDispatch();
    const { products, status } = useSelector((state) => state.product);
    const [categoryProducts, setCategoryProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        const filteredProducts = products?.filter(product => product.productCategory.toLowerCase() === category);
        if (filteredProducts && filteredProducts.length > 0) {
            setCategoryProducts(filteredProducts);
        } else if (status !== 'loading') {
            navigate('/');
        }
    }, [products, category, navigate, status]);

    const handleClick = (product) => {
        dispatch(add(product));
    };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    if (status === 'loading') return <div className="flex items-center justify-center h-screen text-4xl font-extrabold text-gray-700 animate-pulse">Loading...</div>
    if (status === 'error') return <div className="flex items-center justify-center h-screen text-4xl font-extrabold text-red-600 animate-bounce">Error loading products.</div>
    if (categoryProducts.length === 0) return <div className="flex items-center justify-center h-screen text-4xl font-extrabold text-gray-700 animate-pulse">No products found in this category.</div>

    return (
        <>
            <NavBar />
            <div className="bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-extrabold mb-12 text-gray-800 text-center capitalize">
                        {category} Products
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {categoryProducts.map((product) => (
                            <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2">
                                <div
                                    className="relative cursor-pointer"
                                    onClick={() => handleProductClick(product._id)}
                                >
                                    <img
                                        className="w-full h-64 object-cover"
                                        src={`${import.meta.env.VITE_API_URI}/${product.productImage}`}
                                        alt={product.productName}
                                    />
                                    <div className="absolute top-0 right-0 bg-white m-2 px-2 py-1 rounded-full text-xs font-semibold">
                                        {product.status ? 'In Stock' : 'Out of Stock'}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h2
                                        className="text-xl font-bold text-gray-900 mb-2 hover:text-purple-500 cursor-pointer truncate"
                                        onClick={() => handleProductClick(product._id)}
                                    >
                                        {product.productName}
                                    </h2>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.productDesc}</p>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-2xl font-bold text-purple-500">₹{product.productPrice}</span>
                                        <button
                                            onClick={() => handleClick(product)}
                                            className={`py-2 px-4 font-semibold text-white rounded-full transition-colors duration-300 ${product.status
                                                    ? 'bg-purple-500 hover:bg-purple-600'
                                                    : 'bg-gray-300 cursor-not-allowed'
                                                }`}
                                            disabled={!product.status}
                                        >
                                            {product.status ? 'Add to cart' : 'Out of stock'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductCategory;