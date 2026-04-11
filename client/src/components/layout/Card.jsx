import React from 'react'
import { useNavigate } from 'react-router-dom'

const Card = ({ product }) => {

    const Navigate = useNavigate()

    return (
        <div className='group flex flex-col gap-4 cursor-pointer'>
            <div className='relative w-full aspect-4/5 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm group-hover:shadow-xl transition-shadow duration-300'>
                <img onClick={() => Navigate(`/product/${product._id}`)}
                    src={product.image}
                    alt={product.name}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                />
                <div className='absolute bottom-4 left-4 right-4 translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300'>
                    <button onClick={() => Navigate(`/product/${product._id}`)} className='w-full cursor-pointer py-3 bg-white/90 dark:bg-black/90 backdrop-blur-md text-black dark:text-white font-semibold rounded-xl shadow-lg hover:bg-white dark:hover:bg-black transition-colors'>
                        CheckOut
                    </button>
                </div>
            </div>
            <div className='flex justify-between items-start px-1'>
                <div>
                    <h3 className='text-lg font-bold text-gray-900 dark:text-white'>{product.name}</h3>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>{product.category}</p>
                </div>
                <p className='text-lg font-semibold text-blue-900 dark:text-blue-400'>₹{product.price}</p>
            </div>
        </div>
    )
}

export default Card