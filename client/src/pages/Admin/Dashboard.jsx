
const Dashboard = () => {
    return (
        <div className="min-h-screen bg-slate-100 p-10">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard </h1>

            <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold">Total Products</h2>
                    <p className="text-2xl font-bold mt-2">--</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold">Total Orders</h2>
                    <p className="text-2xl font-bold mt-2">--</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold">Revenue</h2>
                    <p className="text-2xl font-bold mt-2">$--</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;