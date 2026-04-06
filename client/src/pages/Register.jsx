import React from 'react';
import { User, Mail, Lock, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/AuthStore';
import { useState } from 'react';

const Register = () => {

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { register, loading, error } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register({ username, email, password });
        const { error } = useAuthStore.getState();
        if (!error) navigate("/");
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 transition-colors duration-300">

            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 sm:p-10 relative overflow-hidden">
                {/* Back to Home */}
                <Link to="/" className="absolute top-6 left-6 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </Link>

                <div className="flex flex-col gap-8 mt-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h2 className="text-3xl font-extrabold text-blue-950 dark:text-white tracking-tight">Join Atelier</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Create an account for exclusive access.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                                type="text"
                                placeholder="Full Name"
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white"
                            />
                        </div>

                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Email Address"
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white"
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Password"
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white"
                            />
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-medium">
                                <span className="text-base">⚠️</span>
                                {error}
                            </div>
                        )}


                        <button
                            type='submit'
                            disabled={loading}
                            className="w-full py-4 mt-2 rounded-xl bg-blue-900 dark:bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-800 dark:hover:bg-blue-500 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >
                            {loading ? "Creating..." : "Create Account"}
                        </button>
                    </form>

                    <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 dark:text-blue-400 font-bold hover:underline transition-all">
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;