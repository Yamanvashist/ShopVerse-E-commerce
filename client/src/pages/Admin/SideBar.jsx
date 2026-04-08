import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    Plus,
    NotebookPen,
    User,
    Settings,
    ChevronRight,
} from "lucide-react";

const pages = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Add Product", href: "/admin/addProduct", icon: Plus },
    { name: "Orders", href: "/admin/orders", icon: NotebookPen },
    { name: "Users", href: "/admin/users", icon: User },
];

const SideBar = () => {
    const location = useLocation();

    return (
        <div className="w-64 bg-black text-white min-h-screen flex flex-col p-5">

            {/* Header */}
            <div className="flex items-center gap-2 border-b border-gray-700 pb-4 mb-6">
                <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center flex-shrink-0">
                    <LayoutDashboard className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-lg font-bold tracking-wide">Admin Panel</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 px-1">
                    Menu
                </p>
                <ul className="space-y-1.5">
                    {pages.map((page) => {
                        const isActive = location.pathname === page.href;

                        return (
                            <li key={page.name}>
                                <Link
                                    to={page.href}
                                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 group
                    ${isActive
                                            ? "bg-green-500 text-white shadow-lg shadow-green-900/30"
                                            : "text-gray-300 hover:bg-white/10 hover:text-white"
                                        }`}
                                >
                                    {/* Active bar */}
                                    <span
                                        className={`w-1 h-4 rounded-full flex-shrink-0 transition-all duration-200 ${isActive ? "bg-white" : "bg-transparent group-hover:bg-green-400"
                                            }`}
                                    />

                                    {/* Icon */}
                                    <page.icon
                                        className={`w-4.5 h-4.5 flex-shrink-0 transition-colors duration-200 ${isActive ? "text-white" : "text-gray-400 group-hover:text-green-400"
                                            }`}
                                    />

                                    {/* Text */}
                                    <span className="flex-1 text-sm">{page.name}</span>

                                    {/* Chevron on active */}
                                    {isActive && (
                                        <ChevronRight className="w-3.5 h-3.5 text-white/70" />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="border-t border-gray-700 pt-4 mt-6">
                <Link
                    to="/admin/settings"
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
            ${location.pathname === "/admin/settings"
                            ? "bg-green-500 text-white"
                            : "text-gray-400 hover:bg-white/10 hover:text-white"
                        }`}
                >
                    <span className="w-1 h-4 rounded-full flex-shrink-0 bg-transparent group-hover:bg-green-400 transition-all duration-200" />
                    <Settings className="w-4 h-4 flex-shrink-0 group-hover:rotate-45 transition-transform duration-300" />
                    <span>Settings</span>
                </Link>
            </div>
        </div>
    );
};

export default SideBar;