import useAuthStore from "../store/AuthStore"
import { Navigate } from "react-router-dom"

const AdminProtect = ({ children }) => {
    const { user, loading } = useAuthStore();

    if (loading) {
        return (
            <div className="flex h-screen w-full flex-col gap-6 bg-gray-900 p-8">
                {/* Header Skeleton */}
                <div className="h-10 w-48 animate-pulse rounded-md bg-gray-700"></div>
                
                {/* Main Content Skeleton */}
                <div className="flex w-full gap-6">
                    {/* Sidebar fake */}
                    <div className="h-72 w-1/4 animate-pulse rounded-xl bg-gray-800"></div>
                    {/* Main panel fake */}
                    <div className="h-72 w-3/4 animate-pulse rounded-xl bg-gray-800"></div>
                </div>
                
                {/* Bottom panel fake */}
                <div className="h-64 w-full animate-pulse rounded-xl bg-gray-800"></div>
            </div>
        );
    }

    if (!user) return <Navigate to="/login" />
    if (user.role !== "admin") return <Navigate to="/" />

    return children;
}

export default AdminProtect