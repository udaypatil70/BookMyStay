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
        {
          label: "Active Hotels", value: stats.totalHotels,
          gradient: "from-indigo-500 to-indigo-600",
          light: "bg-indigo-50", text: "text-indigo-700",
          icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
        },
        {
          label: "Pending Approvals", value: stats.pendingHotels,
          gradient: "from-amber-400 to-amber-500",
          light: "bg-amber-50", text: "text-amber-700",
          icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        },
        {
          label: "Rejected Hotels", value: stats.rejectedHotels,
          gradient: "from-rose-400 to-rose-500",
          light: "bg-rose-50", text: "text-rose-700",
          icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>,
        },
        {
          label: "Total Users", value: stats.totalUsers,
          gradient: "from-violet-500 to-violet-600",
          light: "bg-violet-50", text: "text-violet-700",
          icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
        },
        {
          label: "Total Bookings", value: stats.totalBookings,
          gradient: "from-emerald-500 to-emerald-600",
          light: "bg-emerald-50", text: "text-emerald-700",
          icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
        },
        {
          label: "Total Revenue", value: `$${stats.totalRevenue}`,
          gradient: "from-slate-800 to-slate-900",
          light: "bg-slate-100", text: "text-slate-800",
          icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        },
      ]
    : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Manage platform, approve hotels, and monitor activity.</p>
      </div>

      {stats && (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {statCards.map((stat) => (
            <div key={stat.label} className="group relative bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 hover:shadow-md hover:border-slate-300/60 transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-30" style={{ background: `linear-gradient(135deg, transparent 0%, var(--tw-gradient-stops))` }}>
                <div className={`w-full h-full bg-gradient-to-br ${stat.gradient} opacity-10`} />
              </div>
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">{stat.label}</p>
                  <p className={`text-3xl font-bold mt-3 ${stat.text}`}>{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.light} ${stat.text} transition-transform duration-300 group-hover:scale-110`}>
                  {stat.icon}
                </div>
              </div>
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Pending Approvals</h2>
            <p className="text-sm text-slate-500 mt-0.5">Hotels awaiting review</p>
          </div>
          {pendingHotels.length > 0 && (
            <Link
              to="/admin/pending"
              className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              View All
            </Link>
          )}
        </div>
        <div className="divide-y divide-slate-50">
          {pendingHotels.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-slate-700">All caught up!</p>
              <p className="text-xs text-slate-400 mt-1">No pending hotel submissions.</p>
            </div>
          ) : (
            pendingHotels.slice(0, 5).map((hotel) => (
              <div key={hotel._id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
