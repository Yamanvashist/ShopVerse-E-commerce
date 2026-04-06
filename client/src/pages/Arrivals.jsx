import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';

const Arrivals = () => {
    // Fake database for the new drop
    const newDrops = [
        { id: 1, name: "Midnight Puffer", price: "$520", status: "Just Dropped", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        { id: 2, name: "Eclipse Shades", price: "$145", status: "Selling Fast", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        { id: 3, name: "Onyx Cargo Pants", price: "$190", status: "Just Dropped", img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        { id: 4, name: "Ghost Sneakers", price: "$280", status: "Limited Stock", img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    ];

    return (
        <div className='min-h-screen w-full bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pt-24 pb-20 font-sans'>
            <div className='max-w-7xl mx-auto px-6 lg:px-16 flex flex-col gap-16'>

                {/* Hero Banner for New Arrivals */}
                <div className='relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl bg-blue-950 dark:bg-black flex items-center justify-center text-center px-6'>
                    <div className='absolute inset-0 bg-[url("https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80")] bg-cover bg-center opacity-30 dark:opacity-40 mix-blend-overlay'></div>
                    <div className='relative z-10 flex flex-col items-center gap-4'>
                        <div className='flex items-center gap-2 bg-red-600 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase animate-pulse'>
                            <Clock className='w-4 h-4' /> Live Now
                        </div>
                        <h1 className='text-5xl md:text-7xl font-extrabold text-white tracking-tighter'>Drop 004</h1>
                        <p className='text-gray-300 max-w-lg text-lg'>The latest pieces. Highly limited. Once they are gone, they are gone.</p>
                    </div>
                </div>

                {/* Grid */}
                <div className='flex flex-col gap-8'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-3xl font-extrabold text-blue-950 dark:text-white'>Latest Additions</h2>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {newDrops.map((item) => (
                            <div key={item.id} className='group flex flex-col gap-4 cursor-pointer'>
                                <div className='relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 shadow-sm hover:shadow-xl transition-all duration-300'>
                                    <img src={item.img} alt={item.name} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700' />
                                    
                                    {/* Status Badge */}
                                    <div className='absolute top-4 left-4 bg-white/90 dark:bg-black/90 text-black dark:text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md'>
                                        {item.status}
                                    </div>
                                    
                                    {/* Hover Buy Button */}
                                    <div className='absolute bottom-0 left-0 w-full p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300'>
                                        <button className='w-full bg-blue-900 dark:bg-white text-white dark:text-black font-bold py-3 rounded-xl hover:bg-blue-800 dark:hover:bg-gray-200 transition-colors flex items-center justify-center gap-2'>
                                            Grab It <ArrowRight className='w-4 h-4' />
                                        </button>
                                    </div>
                                </div>
                                <div className='flex justify-between items-start px-1'>
                                    <h3 className='text-lg font-bold text-gray-900 dark:text-white'>{item.name}</h3>
                                    <p className='text-lg font-semibold text-blue-900 dark:text-blue-400'>{item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Arrivals;