

const Footer = () => {
    return (
        <footer className="bg-gray-950 text-gray-300 py-16 px-6 lg:px-16 w-full font-sans mt-auto">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* Brand */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-white font-bold text-2xl tracking-tight">Atelier</h2>
                    <p className="text-sm text-gray-400 text-balance">
                        Minimalist essentials crafted for the modern visionary. Form meets function.
                    </p>
                    
                </div>

                {/* Shop */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-white font-semibold">Shop</h3>
                    <ul className="flex flex-col gap-2 text-sm">
                        <li className="hover:text-white cursor-pointer transition-colors">New Arrivals</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Winter Collection</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Streetwear</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Accessories</li>
                    </ul>
                </div>

                {/* Support */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-white font-semibold">Support</h3>
                    <ul className="flex flex-col gap-2 text-sm">
                        <li className="hover:text-white cursor-pointer transition-colors">FAQ</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Returns & Exchanges</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Shipping Info</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
                    </ul>
                </div>

                {/* Legal */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-white font-semibold">Legal</h3>
                    <ul className="flex flex-col gap-2 text-sm">
                        <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Cookie Policy</li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
                <p>&copy; 2026 Atelier. All rights reserved.</p>
                <p>Designed for reality.</p>
            </div>
        </footer>
    )
}

export default Footer