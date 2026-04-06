import React from 'react';
import { useState } from 'react';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/AuthStore';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const { login, loading, error } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login({ email, password })
            const { error } = useAuthStore.getState();
            if (!error) navigate("/");
        } catch (err) {
            console.log("Login error")
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 transition-colors duration-300">

            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 sm:p-10 relative overflow-hidden">
                {/* Back to Home */}
                <Link to="/" className="absolute top-6 left-6 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </Link>

                <div className="flex flex-col gap-8 mt-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h2 className="text-3xl font-extrabold text-blue-950 dark:text-white tracking-tight">Welcome Back</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Enter your details to access your account.</p>
                    </div>

                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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

                        <div className="flex justify-end">
                            <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold cursor-pointer hover:underline">
                                Forgot Password?
                            </span>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-medium">
                                <span className="text-base">⚠️</span>
                                {error}
                            </div>
                        )}

                        <button disabled={loading} type='submit' className="w-full py-4 mt-2 rounded-xl bg-blue-900 dark:bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-800 dark:hover:bg-blue-500 hover:-translate-y-0.5 transition-all duration-200">
                            {loading ? "Logging..." : "Login"}
                        </button>
                    </form>

                    <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-blue-600 dark:text-blue-400 font-bold hover:underline transition-all">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;