import React from 'react';
import { Lock } from 'lucide-react';

const Archive = () => {
    // Fake database of your legendary past drops
    const pastDrops = [
        { id: 1, year: '2024', name: 'Drop 001: Genesis', desc: 'The collection that started it all. Heavyweight cottons, raw hems, and the blueprint of our silhouette.', img: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
        { id: 2, year: '2025', name: 'Project Void', desc: 'An exploration into technical fabrics and utility. Sold out in 14 minutes.', img: 'https://imgs.search.brave.com/daoeMuM7tnmat3QY4pz6yWdyDf9WCqWR1hkkwFiQqcg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTU1/NjQxNDg4L3Bob3Rv/L2Nsb3RoZXMtc2hv/cC1jb3N0dW1lLWRy/ZXNzLWZhc2hpb24t/c3RvcmUtc3R5bGUt/Y29uY2VwdC5qcGc_/Yj0xJnM9NjEyeDYx/MiZ3PTAmaz0yMCZj/PXZZN1o0MHVsd3hz/Rm1ldGplMWNrOTFD/LUdTUEZwRlVacU94/a0lwdU11Zzg9' },
        { id: 3, year: '2025', name: 'Winter: Structural', desc: 'Our take on cold-weather architecture. Oversized wool coats and dense knits.', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' }
    ];

    return (
        <div className='min-h-screen w-full bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pt-24 pb-20 font-sans'>
            <div className='max-w-7xl mx-auto px-6 lg:px-16 flex flex-col gap-20'>
                
                {/* Header */}
                <div className='flex flex-col items-center text-center gap-6 border-b border-gray-200 dark:border-gray-800 pb-12'>
                    <Lock className='w-12 h-12 text-gray-400 dark:text-gray-600' />
                    <h1 className='text-5xl md:text-8xl font-extrabold text-blue-950 dark:text-white tracking-tighter uppercase'>The Vault</h1>
                    <p className='text-gray-500 dark:text-gray-400 text-lg max-w-2xl'>
                        A documented history of our past work. These pieces are permanently locked into the archive and will never be reproduced.
                    </p>
                </div>

                {/* Timeline Layout */}
                <div className='flex flex-col gap-24'>
                    {pastDrops.map((drop, index) => (
                        <div key={drop.id} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
                            
                            {/* Image with Greyscale Hover Effect */}
                            <div className='w-full md:w-1/2 group relative overflow-hidden rounded-3xl grayscale hover:grayscale-0 transition-all duration-700 shadow-xl'>
                                <img src={drop.img} alt={drop.name} className='w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700' />
                                <div className='absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500'></div>
                            </div>

                            {/* Text & Details */}
                            <div className='w-full md:w-1/2 flex flex-col gap-6 px-4 md:px-12'>
                                <span className='text-blue-800 dark:text-blue-500 font-mono font-bold tracking-widest text-sm'>{drop.year}</span>
                                <h2 className='text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight'>{drop.name}</h2>
                                <p className='text-gray-600 dark:text-gray-400 text-lg leading-relaxed'>{drop.desc}</p>
                                
                                {/* Fake Locked Button */}
                                <button className='w-fit mt-4 px-8 py-3 rounded-full border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 font-semibold cursor-not-allowed flex items-center gap-2'>
                                    <Lock className='w-4 h-4' /> Locked
                                </button>
                            </div>
                            
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Archive;