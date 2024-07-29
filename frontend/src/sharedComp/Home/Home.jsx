import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../../assets/Hero.jpeg'
import headphones from '../../assets/headphones.jpeg'
import speaker from '../../assets/speaker.jpeg'
import smartwatch from '../../assets/Smartwatch.jpeg'
import camera from '../../assets/camera.jpeg'

const categoryImages = { speaker, headphones, smartwatch ,camera};

const categories = [
    // { name: 'Speaker', image: categoryImages.speaker, id: 'speaker' },
    { name: 'Headphones', image: categoryImages.headphones, id: 'headphones' },
    { name: 'camera', image: categoryImages.camera, id: 'camera' },
    { name: 'Smartwatch', image: categoryImages.smartwatch, id: 'smartwatch' },
];


const Home = () => {
    const navigate = useNavigate();

    const handleCategorySelect = (categoryId) => {
        console.log(categoryId);
        navigate(`/products/${categoryId}`);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
            <div className="flex-grow select-none">
                <div className="relative overflow-hidden shadow-2xl">
                    <img src={Hero} alt="Hero" className="w-full h-[88vh] object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white px-4">
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 text-center leading-tight animate-fade-in-down">Welcome to Fonik</h1>
                        <p className="text-xl md:text-3xl mb-12 text-center max-w-3xl font-light animate-fade-in-up">Bringing Energy to Your Doorstep.</p>
                        <Link
                            to="/products"
                            className="bg-white text-black px-10 py-4 rounded-full font-bold text-xl hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-bounce"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
                <div className="my-24 mx-7">
                    <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-800 animate-fade-in">Shop by Category</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        {categories.map((category, index) => (
                            <CategoryCard key={index} category={category} onSelect={handleCategorySelect} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;


const CategoryCard = ({ category, onSelect }) => (
    <div onClick={() => onSelect(category.id)} className="cursor-pointer group ">
        <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2  h-[89vh] ">
            <img src={category.image} alt={category.name} className="w-full object-cover group-hover:scale-125 transition-all duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
            <div className="absolute top-0 right-0 p-6">
                <h3 className="text-white text-4xl font-bold group-hover:scale-110 transition-transform duration-300">{category.name}</h3>
            </div>
        </div>
    </div>
);