import useProductStore from '../store/ProductStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/layout/Loading';
import Card from '../components/layout/Card';

const Collection = () => {

    const { products, fetchProducts, loading, error } = useProductStore();

    const Navigate = useNavigate()

    useEffect(() => {
        fetchProducts()
    }, [])

    if (loading) return <Loading />
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
                        {['Shoes', 'Accessories', 'Clothing'].map((filter) => (
                            <button onClick={() => Navigate(`/collections/${filter.toLowerCase()}`)} key={filter} className='px-5 py-2 rounded-full border border-gray-300 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-blue-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors whitespace-nowrap cursor-pointer'>
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-6'>
                    {products.map((product) => (
                        <Card key={product._id} product={product} />
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Collection