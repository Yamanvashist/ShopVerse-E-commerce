import useProductStore from '../store/ProductStore';
import { useEffect } from 'react';

const Collection = () => {

    const { products, fetchProducts, loading, error } = useProductStore();

    useEffect(() => {
        fetchProducts()
    }, [])

    if (loading) return <p className="text-center text-5xl mt-20">Loading bro...</p>;
    if (error) return <p className="text-center mt-20 text-5xl text-red-500">Error </p>;
    

    return (
        <div className='min-h-screen w-full bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pt-24 pb-20'>
            <div className='max-w-7xl mx-auto px-6 lg:px-16 flex flex-col gap-12'>

                {/* Header Section */}
                <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 dark:border-gray-800 pb-8'>
                    <div className='flex flex-col gap-4'>
                        <h1 className='text-5xl md:text-7xl font-sans font-extrabold text-blue-950 dark:text-white tracking-tight'>The Collection</h1>
                        <p className='text-gray-500 dark:text-gray-400 text-lg max-w-xl'>Curated essentials for the modern visionary. Uncompromising quality meets everyday utility.</p>
                    </div>

                    {/* Filter Pills */}
                    <div className='flex gap-3 overflow-x-auto pb-2 md:pb-0 hide-scrollbar'>
                        {['All', 'Outerwear', 'Accessories', 'Streetwear'].map((filter) => (
                            <button key={filter} className='px-5 py-2 rounded-full border border-gray-300 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-blue-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors whitespace-nowrap cursor-pointer'>
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12'>
                    {products.map((product) => (
                        <div key={product.id} className='group flex flex-col gap-4 cursor-pointer'>
                            {/* Image Container */}
                            <div className='relative w-full aspect-4/5 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm group-hover:shadow-xl transition-shadow duration-300'>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                                />

                                {/* Hover "Quick Add" button */}
                                <div className='absolute bottom-4 left-4 right-4 translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300'>
                                    <button className='w-full cursor-pointer py-3 bg-white/90 dark:bg-black/90 backdrop-blur-md text-black dark:text-white font-semibold rounded-xl shadow-lg hover:bg-white dark:hover:bg-black transition-colors'>
                                        Quick Add
                                    </button>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className='flex justify-between items-start px-1'>
                                <div>
                                    <h3 className='text-lg font-bold text-gray-900 dark:text-white'>{product.name}</h3>
                                    <p className='text-sm text-gray-500 dark:text-gray-400'>{product.category}</p>
                                </div>
                                <p className='text-lg font-semibold text-blue-900 dark:text-blue-400'>₹{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Collection