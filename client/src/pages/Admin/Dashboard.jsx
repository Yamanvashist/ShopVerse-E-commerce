import {
    LayoutDashboard,
    Package,
    Plus,
    NotebookPen,
    User,
    Settings,
    ChevronRight,
    DollarSign 
} from "lucide-react";


const Dashboard = () => {
    return (
        <div className="min-h-screen bg-slate-100 p-10">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard </h1>

            <div className="grid grid-cols-4 gap-6">
                <div className="bg-green-400 p-4  rounded shadow">
                    <div className="bg-white/20 p-2 w-fit mb-2 rounded-lg">
                        <Package className="text-white"></Package>
                    </div>

                    <h2 className="text-3xl text-white font-semibold">200</h2>
                    <p className="text-white font-sans font-semibold mt-2">Total Products</p>
                </div>

                <div className="bg-purple-400 p-4  rounded shadow">
                    <div className="bg-white/20 p-2 w-fit mb-2 rounded-lg">
                        <NotebookPen className="text-white"></NotebookPen>
                    </div>

                    <h2 className="text-3xl text-white font-semibold">100</h2>
                    <p className="text-white font-sans font-semibold mt-2">Total Orders</p>
                </div>

               <div className="bg-blue-400 p-4  rounded shadow">
                    <div className="bg-white/20 p-2 w-fit mb-2 rounded-lg">
                        <DollarSign className="text-white" />
                    </div>

                    <h2 className="text-3xl text-white font-semibold">$2300</h2>
                    <p className="text-white font-sans font-semibold mt-2">Revenue</p>
                </div>

                <div className="bg-pink-400 p-4  rounded shadow">
                    <div className="bg-white/20 p-2 w-fit mb-2 rounded-lg">
                        <User className="text-white"></User>
                    </div>

                    <h2 className="text-3xl text-white font-semibold">20</h2>
                    <p className="text-white font-sans font-semibold mt-2">Total Users</p>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;