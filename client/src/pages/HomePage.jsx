import blueWoman from "../assets/blueWoman.png"
import StreetWear from "../assets/StreetWear.jpg"
import MinimalistImg from "../assets/Minimalist.png"
import AccessoriesImg from "../assets/Accessories.jpg"
import ItachiShoes from "../assets/ItachiShoes.jpg"
import { useNavigate } from "react-router-dom"

const HomePage = () => {

    const categories = [
        { name: 'Clothing', img: StreetWear },
        { name: 'Shoes', img: ItachiShoes }, 
        { name: 'Accessories', img: AccessoriesImg } 
    ];

    const Navigate = useNavigate()

    return (
        <div className="w-full flex flex-col bg-slate-50 font-sans">
            

            {/* Hero Section */}
            <main className="min-h-[85vh] flex items-center justify-between max-w-7xl mx-auto px-6 lg:px-16 w-full py-12">
                {/* Left Side */}
                <div className="flex flex-col items-start gap-6 max-w-xl">
                    <p className="bg-indigo-100 text-indigo-700 text-xs font-bold tracking-wide uppercase px-4 py-1.5 rounded-full w-fit">
                        Winter Collection 2026
                    </p>

                    <h1 className="text-6xl lg:text-9xl text-blue-950 font-extrabold leading-tight tracking-tight">
                        Fashion <br className="hidden lg:block" /> Simplicity
                    </h1>

                    <p className="text-gray-600 text-lg leading-relaxed max-w-md text-balance">
                        Curated minimalist essentials crafted for the modern visionary. Experience the harmony of form and function.
                    </p>

                    <div className="flex items-center gap-8 mt-4">
                        <button onClick={()=>Navigate("/collections")} className="bg-blue-900 text-white font-semibold px-8 py-4 rounded-lg shadow-md hover:bg-blue-800 transition-all cursor-pointer">
                            Explore Collection
                        </button>
                        <button className="text-blue-800 font-semibold border-b-2 border-blue-800 pb-1 hover:text-blue-950 hover:border-blue-950 transition-colors cursor-pointer">
                            LookBook
                        </button>
                    </div>
                </div>

                {/* Right Side */}
                <div className="hidden lg:block w-full max-w-md relative">
                    <img
                        className="rounded-3xl object-cover w-full h-auto shadow-2xl"
                        src={blueWoman}
                        alt="Winter Collection Model"
                    />
                    <div className="flex flex-col absolute -bottom-8 -left-8 p-6 shadow-2xl rounded-2xl bg-white/50 backdrop-blur-md border border-white/40 z-10 w-64">
                        <p className="text-blue-800 text-xs font-bold uppercase tracking-wide mb-1">Featured Price</p>
                        <h1 className="text-gray-900 font-bold leading-tight tracking-tight text-xl mb-2">Indigo Coat</h1>
                        <p className="text-blue-900 font-bold text-lg">$1,250</p>
                    </div>
                </div>
            </main>

            {/* New Trending Section */}
            <section className="w-full bg-white py-24 px-6 lg:px-16">
                <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
                    <h2 className="text-4xl md:text-5xl text-blue-950 font-extrabold tracking-tight">Trending Now</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                        {categories.map((category, idx) => (
                            <div onClick={()=>Navigate(`/collections/${category.name.toLowerCase()}`)} key={idx} className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300">

                                {/* Background Image */}
                                <img
                                    src={category.img}
                                    alt={category.name}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />

                                {/* Dark Gradient Overlay for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Text Content */}
                                <div className="absolute inset-0 flex items-end justify-center p-8">
                                    <h3 className="text-3xl font-bold text-white tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        {category.name}
                                    </h3>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="showpiece" className="w-full bg-slate-50 py-20">
                <div className="grid grid-cols-7 grid-rows-7 gap-4 max-w-7xl mx-auto px-6 lg:px-16 h-[80vh]">
                    {/* Left tall image */}
                    <div className="col-span-3 row-span-7 rounded-3xl overflow-hidden shadow-md">
                        <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" src="https://maybeboth.com/wp-content/uploads/2021/08/IMG_0054-819x1024.jpg" alt="Streetwear" />
                    </div>

                    {/* Top right wide image */}
                    <div className="col-span-4 row-span-4 col-start-4 rounded-3xl overflow-hidden shadow-md">
                        <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" src="https://globalboutique.com/wp-content/uploads/2023/05/featured-gold-watches-800x600.jpg" alt="Minimalist" />
                    </div>

                    {/* Bottom middle image */}
                    <div className="col-span-2 row-span-3 col-start-4 row-start-5 rounded-3xl overflow-hidden shadow-md">
                        <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" src="https://rubans.in/cdn/shop/collections/rings_2.png?v=1728051651" alt="Accessories" />
                    </div>

                    {/* Bottom right empty space / call to action */}
                    <div className="col-span-2 row-span-3 col-start-6 row-start-5 overflow-hidden bg-blue-900 rounded-3xl flex items-center justify-center shadow-md cursor-pointer hover:bg-blue-800 transition-colors">
                        <img src="https://www.littlefingersindia.com/wp-content/uploads/2022/07/LFbridalset284.jpg" className="w-full h-full rounded-2xl object-cover hover:scale-105 transition-all duration-500" alt="Jewellery" />
                    </div>
                </div>
            </section>

            <section id="feedback" className="py-32 bg-white flex flex-col items-center justify-center px-6">
                <div className="flex flex-col items-center justify-center w-full max-w-2xl gap-6 text-center">
                    <h1 className="text-blue-950 font-extrabold text-4xl md:text-5xl tracking-tight">Be Part of the Family</h1>

                    <p className="text-gray-500 text-sm md:text-base max-w-md text-balance">
                        Join our private list for early access to drops and exclusive offers. No spam, just pure heat.
                    </p>

                    <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-4" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            className="flex-1 outline-none rounded-full  px-6 py-4 placeholder-gray-400 bg-slate-100 focus:ring-2 focus:ring-blue-300 transition-all w-full"
                            placeholder="Your email address"
                            required
                        />
                        <button
                            type="submit"
                            className="rounded-full px-8 py-4 text-white font-bold bg-blue-900 hover:bg-blue-800 transition-colors shadow-md w-full sm:w-auto cursor-pointer whitespace-nowrap"
                        >
                            Join Now
                        </button>
                    </form>
                </div>
            </section>


        </div>
    )
}

export default HomePage