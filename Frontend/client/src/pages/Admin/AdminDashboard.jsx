import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { axios, getToken } = useAppContext();
  const [stats, setStats] = useState(null);
  const [pendingHotels, setPendingHotels] = useState([]);

  const fetchData = async () => {
    try {
      const token = await getToken();
      const [statsRes, pendingRes] = await Promise.all([
        axios.get("/api/admin/stats", { headers: { Authorization: `Bearer ${token}` } }),
        axios.get("/api/admin/hotels/pending", { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      if (statsRes.data.success) setStats(statsRes.data.stats);
      if (pendingRes.data.success) setPendingHotels(pendingRes.data.hotels);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const statCards = stats
    ? [
        { label: "Active Hotels", value: stats.totalHotels, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Pending Approvals", value: stats.pendingHotels, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Rejected Hotels", value: stats.rejectedHotels, color: "text-red-600", bg: "bg-red-50" },
        { label: "Total Users", value: stats.totalUsers, color: "text-violet-600", bg: "bg-violet-50" },
        { label: "Total Bookings", value: stats.totalBookings, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Total Revenue", value: `$${stats.totalRevenue}`, color: "text-slate-900", bg: "bg-slate-50" },
      ]
    : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">Admin Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Manage platform, approve hotels, and monitor activity.</p>
      </div>

      {stats && (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {statCards.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
              <p className={`text-3xl font-bold mt-3 ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Pending Approvals</h2>
            <p className="text-sm text-slate-500 mt-0.5">Hotels awaiting review</p>
          </div>
          {pendingHotels.length > 0 && (
            <Link
              to="/admin/pending"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All
            </Link>
          )}
        </div>
        <div className="divide-y divide-slate-50">
          {pendingHotels.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm font-medium text-slate-600">All caught up!</p>
              <p className="text-xs text-slate-400 mt-1">No pending hotel submissions.</p>
            </div>
          ) : (
            pendingHotels.slice(0, 5).map((hotel) => (
              <div key={hotel._id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{hotel.name}</p>
                    <p className="text-xs text-slate-400">{hotel.city} · {hotel.owner?.username}</p>
                  </div>
                </div>
                <span className="text-xs text-slate-400">{new Date(hotel.createdAt).toLocaleDateString()}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
