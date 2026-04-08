import SideBar from "../pages/Admin/SideBar"
import { Outlet } from "react-router-dom"


const AdminLayout = () => {
    return (
        <div className="flex min-h-screen">
            <SideBar />

            <div className="flex-1  bg-gray-100">
                <Outlet/>
            </div>
        </div>
    )
}

export default AdminLayout