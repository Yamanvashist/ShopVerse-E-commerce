import useAuthStore from "../store/AuthStore"
import { Navigate } from "react-router-dom"

const AdminProtect = ({ children }) => {

    const { user } = useAuthStore();

    if (!user) return <Navigate to="/login" />
    if (user.role !== "admin") return <Navigate to="/" />

    return children;

}

export default AdminProtect