import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AdminHotels = () => {
  const { axios, getToken } = useAppContext();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  const fetchHotels = async (page = 1, status = "") => {
    try {
      setLoading(true);
      const token = await getToken();
      const params = { page, limit: 20 };
      if (status) params.status = status;
      const { data } = await axios.get("/api/admin/hotels", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      if (data.success) {
        setHotels(data.hotels);
        setPagination(data.pagination);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const status = activeTab === "all" ? "" : activeTab;
    fetchHotels(1, status);
  }, [activeTab]);

  const tabs = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "active", label: "Active" },
    { key: "rejected", label: "Rejected" },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Active
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-amber-50 text-amber-700 ring-1 ring-amber-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Pending
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-rose-50 text-rose-700 ring-1 ring-rose-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">All Hotels</h1>
        <p className="text-sm text-slate-500 mt-1">View and manage all registered hotels.</p>
      </div>

      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "bg-white text-indigo-700 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-[3px] border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : hotels.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 py-16 text-center">
          <p className="text-sm font-medium text-slate-500">No hotels found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="py-3 px-6 text-left text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">Hotel</th>
                  <th className="py-3 px-6 text-left text-xs font-semibold uppercase tracking-[0.1em] text-slate-400 hidden md:table-cell">Owner</th>
                  <th className="py-3 px-6 text-left text-xs font-semibold uppercase tracking-[0.1em] text-slate-400 hidden md:table-cell">City</th>
                  <th className="py-3 px-6 text-center text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">Status</th>
                  <th className="py-3 px-6 text-right text-xs font-semibold uppercase tracking-[0.1em] text-slate-400 hidden md:table-cell">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {hotels.map((hotel) => (
                  <tr key={hotel._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <p className="text-sm font-semibold text-slate-800">{hotel.name}</p>
                      <p className="text-xs text-slate-400">{hotel.contact}</p>
                    </td>
                    <td className="py-4 px-6 hidden md:table-cell">
                      <p className="text-sm text-slate-600">{hotel.owner?.username || "N/A"}</p>
                      <p className="text-xs text-slate-400">{hotel.owner?.email || ""}</p>
                    </td>
                    <td className="py-4 px-6 hidden md:table-cell">
                      <span className="text-sm text-slate-600">{hotel.city}</span>
                    </td>
                    <td className="py-4 px-6 text-center">{getStatusBadge(hotel.status)}</td>
                    <td className="py-4 px-6 text-right hidden md:table-cell">
                      <span className="text-xs text-slate-400">{new Date(hotel.createdAt).toLocaleDateString()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pagination.pages > 1 && (
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
              <p className="text-xs text-slate-400">
                Page {pagination.page} of {pagination.pages} ({pagination.total} total)
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => fetchHotels(pagination.page - 1, activeTab === "all" ? "" : activeTab)}
                  disabled={pagination.page <= 1}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 transition-all"
                >
                  Previous
                </button>
                <button
                  onClick={() => fetchHotels(pagination.page + 1, activeTab === "all" ? "" : activeTab)}
                  disabled={pagination.page >= pagination.pages}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 transition-all"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminHotels;
