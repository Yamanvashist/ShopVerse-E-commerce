import React, { useState, useRef, useEffect } from 'react';
import { ShoppingCart, Menu, X, LogOut, User, ChevronRight } from 'lucide-react';
import { useNavigate,useLocation } from 'react-router-dom';
import useAuthStore from '../../store/AuthStore';


const lists = [
    { name: "Collections", href: "/collections" },
    { name: "New Arrivals", href: "/arrivals" },
    { name: "Archive", href: "/archive" },
    { name: "About", href: "/about" },
]

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [profileopen, setProfileOpen] = useState(false);
    const dropdownRef = useRef(null);

    const location = useLocation()
    const pathName = location.pathname

    const Navigate = useNavigate();
    const { user, logout } = useAuthStore();

    // close dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleLogout = async () => {
        await logout();
        setProfileOpen(false);
        Navigate("/");
    };

    // avatar initials
    const initials = user?.username
        ? user.username.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
        : null;

    return (
        <nav className='bg-white w-full border-b border-gray-100 relative z-50'>
            <div className='flex items-center justify-between px-6 lg:px-14 h-20 w-full'>

                {/* Logo */}
                <h1
                    onClick={() => Navigate("/")}
                    className='text-blue-900 font-serif font-bold text-2xl tracking-widest cursor-pointer uppercase'
                >
                    Atelier
                </h1>

                {/* Desktop Links */}
                <ul className='hidden lg:flex flex-row gap-10'>
                    {lists.map((list, key) => (
                        <li
                            onClick={() => Navigate(list.href)}
                            className={`relative text-sm font-medium tracking-widest uppercase cursor-pointer hover:text-blue-900 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-blue-900 hover:after:w-full after:transition-all after:duration-300 ${list.href == pathName ? "text-blue-700" : "text-black"}`}
                            key={key}
                        >
                            {list.name}
                        </li>
                    ))}
                </ul>

                {/* Right Icons */}
                <div className='hidden lg:flex items-center gap-6'>

                    {/* Search */}
                    <div className='relative flex items-center'>
                        <svg className='absolute left-3 w-4 h-4 text-gray-400 pointer-events-none' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z' />
                        </svg>
                        <input
                            type='text'
                            placeholder='Search...'
                            className='w-44 pl-9 pr-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-200 focus:border-blue-300 outline-none transition-all focus:w-56'
                        />
                    </div>

                    {/* Cart */}
                    <div className='relative cursor-pointer group'>
                        <ShoppingCart className='w-5 h-5 text-gray-600 group-hover:text-blue-900 transition-colors' />
                        <span className='absolute -top-2 -right-2 w-4 h-4 bg-blue-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center'>0</span>
                    </div>

                    {/* Profile */}
                    <div className='relative' ref={dropdownRef}>
                        <button
                            onClick={() => setProfileOpen(!profileopen)}
                            className='flex items-center gap-2 focus:outline-none'
                        >
                            {user ? (
                                <div className='w-9 h-9 rounded-full bg-blue-900 text-white text-sm font-bold cursor-pointer flex items-center justify-center tracking-wide shadow-md hover:shadow-lg hover:bg-blue-800 transition-all'>
                                    {user.email[0].toUpperCase()}
                                </div>
                            ) : (
                                <div className='w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center hover:bg-gray-200 transition-all'>
                                    <User className='w-4 h-4 text-gray-500' />
                                </div>
                            )}
                        </button>

                        {/* Dropdown */}
                        {profileopen && (
                            <div className='absolute top-full right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 '>

                                {user ? (
                                    <>
                                        {/* User Info Header */}
                                        <div className='px-5 py-4 bg-gradient-to-br from-blue-950 to-blue-800'>
                                            <div className='flex items-center gap-3'>
                                                <div className='w-10 h-10 rounded-full bg-white/20 text-white text-sm font-bold flex items-center justify-center border border-white/30'>
                                                    {user.email[0].toUpperCase()}
                                                </div>
                                                <div className='flex flex-col min-w-0'>
                                                    <p className='text-white font-semibold text-sm truncate'>{user.username}</p>
                                                    <p className='text-blue-200 text-xs truncate'>{user.email}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Menu Items */}
                                        <div className='p-2'>
                                            <button className='w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-gray-600 text-sm font-medium hover:bg-gray-50 hover:text-blue-900 transition-all group cursor-pointer'>
                                                <span>My Orders</span>
                                                <ChevronRight className='w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity' />
                                            </button>
                                            <button className='w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-gray-600 text-sm font-medium hover:bg-gray-50 hover:text-blue-900 transition-all group cursor-pointer'>
                                                <span>Wishlist</span>
                                                <ChevronRight className='w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity' />
                                            </button>
                                            <button className='w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-gray-600 text-sm font-medium hover:bg-gray-50 hover:text-blue-900 transition-all group cursor-pointer'>
                                                <span>Account Settings</span>
                                                <ChevronRight className='w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity' />
                                            </button>
                                        </div>

                                        {/* Logout */}
                                        <div className='px-2 pb-2 border-t border-gray-100 pt-1'>
                                            <button
                                                onClick={handleLogout}
                                                className='w-full cursor-pointer flex items-center gap-2 px-3 py-2.5 rounded-xl text-red-500 text-sm font-semibold hover:bg-red-50 transition-all'
                                            >
                                                <LogOut className='w-4 h-4' />
                                                Sign out
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {/* Guest Header */}
                                        <div className='px-5 py-4 bg-gradient-to-br from-blue-950 to-blue-800'>
                                            <p className='text-white font-semibold text-sm'>Welcome to Atelier</p>
                                            <p className='text-blue-200 text-xs mt-0.5'>Sign in for exclusive access</p>
                                        </div>

                                        <div className='p-3 flex flex-col gap-2'>
                                            <button
                                                onClick={() => { Navigate("/login"); setProfileOpen(false); }}
                                                className="w-full py-2.5 rounded-xl bg-blue-900 text-white text-sm font-bold hover:bg-blue-800 hover:-translate-y-0.5 transition-all duration-200"
                                            >
                                                Sign In
                                            </button>
                                            <button
                                                onClick={() => { Navigate("/register"); setProfileOpen(false); }}
                                                className="w-full py-2.5 rounded-xl bg-white text-blue-900 text-sm font-bold border-2 border-blue-100 hover:bg-blue-50 hover:-translate-y-0.5 transition-all duration-200"
                                            >
                                                Create Account
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile */}
                <div className='lg:hidden flex items-center gap-5'>
                    <ShoppingCart className='w-5 h-5 text-gray-700 cursor-pointer' />
                    <button onClick={() => setIsOpen(!isOpen)} className='text-gray-800 focus:outline-none'>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className='lg:hidden absolute top-20 left-0 w-full bg-white shadow-xl flex flex-col border-t border-gray-100 z-40'>
                    <div className='px-6 pt-4 pb-2'>
                        <input type='text' placeholder='Search products...' className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200' />
                    </div>

                    {lists.map((list, key) => (<a
                        
                            href={list.href}
                            className={`px-6 py-3.5  font-medium text-sm tracking-widest uppercase border-b border-gray-50 hover:text-blue-900 hover:bg-gray-50 transition-colors ${list.href == pathName ? "text-blue-600" : "text-gray-700"}`}
                            key={key}
                        >
                            {list.name}
                        </a>
                    ))}

                    {/* Mobile User Section */}
                    {user ? (
                        <div className='mx-4 my-4 p-4 rounded-2xl bg-gradient-to-br from-blue-950 to-blue-800'>
                            <div className='flex items-center gap-3 mb-3'>
                                <div className='w-10 h-10 rounded-full bg-white/20 text-white text-sm font-bold flex items-center justify-center border border-white/30'>
                                    {user.email[0].toUpperCase()}
                                </div>
                                <div>
                                    <p className='text-white font-semibold text-sm'>{user.username}</p>
                                    <p className='text-blue-200 text-xs'>{user.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className='w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-semibold hover:bg-white/20 transition-all'
                            >
                                <LogOut className='w-4 h-4' />
                                Sign out
                            </button>
                        </div>
                    ) : (
                        <div className='px-4 py-4 flex flex-col gap-2'>
                            <button onClick={() => Navigate("/login")} className='w-full py-3 rounded-xl bg-blue-900 text-white text-sm font-bold'>Sign In</button>
                            <button onClick={() => Navigate("/register")} className='w-full py-3 rounded-xl border-2 border-blue-100 text-blue-900 text-sm font-bold'>Create Account</button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;