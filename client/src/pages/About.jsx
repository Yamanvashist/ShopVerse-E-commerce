import React from 'react';
import { Leaf, Scissors, Globe } from 'lucide-react';

const About = () => {
    return (
        <div className='min-h-screen w-full bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pt-24 pb-20 font-sans'>
            <div className='max-w-7xl mx-auto px-6 lg:px-16 flex flex-col gap-24'>

                {/* Hero Statement */}
                <div className='flex flex-col gap-8 max-w-4xl'>
                    <h1 className='text-6xl md:text-8xl font-extrabold text-blue-950 dark:text-white tracking-tighter leading-tight'>
                        Form. <br />
                        Function. <br />
                        Future.
                    </h1>
                    <p className='text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl text-balance'>
                        Atelier was founded on a simple principle: clothing should be an extension of architecture. 
                        We don't follow seasons. We build structural, timeless essentials designed to outlast trends.
                    </p>
                </div>

                {/* Full Width Image */}
                <div className='w-full h-[50vh] md:h-[70vh] rounded-3xl overflow-hidden shadow-2xl dark:shadow-black/50'>
                    <img 
                        src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                        alt="Atelier Studio" 
                        className='w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 cursor-pointer'
                    />
                </div>

                {/* Philosophy Section */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-gray-200 dark:border-gray-800 pt-16'>
                    <div>
                        <h2 className='text-3xl md:text-4xl font-extrabold text-blue-950 dark:text-white sticky top-24'>The Philosophy</h2>
                    </div>
                    <div className='flex flex-col gap-6 text-gray-600 dark:text-gray-400 text-lg leading-relaxed'>
                        <p>
                            We started in a small studio with nothing but a sewing machine and a massive rejection of fast fashion. 
                            The industry moves too fast, creating garbage at a terrifying rate. We decided to slow down.
                        </p>
                        <p>
                            Every piece we create takes months of prototyping. We obsess over the weight of the cotton, 
                            the drape of the wool, and the exact placement of every single seam. It’s not just clothing; it’s industrial design for the human body.
                        </p>
                    </div>
                </div>

                {/* Core Values */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-200 dark:border-gray-800 pt-16'>
                    <div className='flex flex-col gap-4 group'>
                        <div className='w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-700 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300'>
                            <Leaf className='w-7 h-7' />
                        </div>
                        <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>Sustainable Sourcing</h3>
                        <p className='text-gray-500 dark:text-gray-400 leading-relaxed'>We exclusively use organic, recycled, or deadstock fabrics. Zero compromise on the planet.</p>
                    </div>

                    <div className='flex flex-col gap-4 group'>
                        <div className='w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-700 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300'>
                            <Scissors className='w-7 h-7' />
                        </div>
                        <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>Ethical Craft</h3>
                        <p className='text-gray-500 dark:text-gray-400 leading-relaxed'>Hand-stitched in our private ateliers by artisans who are paid fair, thriving living wages.</p>
                    </div>

                    <div className='flex flex-col gap-4 group'>
                        <div className='w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-700 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300'>
                            <Globe className='w-7 h-7' />
                        </div>
                        <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>Global Vision</h3>
                        <p className='text-gray-500 dark:text-gray-400 leading-relaxed'>Designed in the studio, built for the world. Our silhouettes are universally functional.</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default About;