import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AdminUsers = () => {
  const { axios, getToken } = useAppContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [updatingRole, setUpdatingRole] = useState(null);

  const fetchUsers = async (page = 1, role = "") => {
    try {
      setLoading(true);
      const token = await getToken();
      const params = { page, limit: 20 };
      if (role) params.role = role;
      const { data } = await axios.get("/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      if (data.success) {
        setUsers(data.users);
        setPagination(data.pagination);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const role = activeTab === "all" ? "" : activeTab;
    fetchUsers(1, role);
  }, [activeTab]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      setUpdatingRole(userId);
      const token = await getToken();
      const { data } = await axios.post(
        "/api/admin/users/role",
        { userId, role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success("Role updated successfully");
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setUpdatingRole(null);
    }
  };

  const tabs = [
    { key: "all", label: "All" },
    { key: "user", label: "Users" },
    { key: "hotelOwner", label: "Hotel Owners" },
    { key: "admin", label: "Admins" },
  ];

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-violet-50 text-violet-700 ring-1 ring-violet-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            Admin
          </span>
        );
      case "hotelOwner":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Hotel Owner
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-slate-100 text-slate-600 ring-1 ring-slate-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            User
          </span>
        );
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Manage Users</h1>
        <p className="text-sm text-slate-500 mt-1">View and manage user accounts and roles.</p>
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
      ) : users.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 py-16 text-center">
          <p className="text-sm font-medium text-slate-500">No users found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="py-3 px-6 text-left text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">User</th>
                  <th className="py-3 px-6 text-left text-xs font-semibold uppercase tracking-[0.1em] text-slate-400 hidden md:table-cell">Phone</th>
                  <th className="py-3 px-6 text-center text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">Role</th>
                  <th className="py-3 px-6 text-center text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">Actions</th>
                  <th className="py-3 px-6 text-right text-xs font-semibold uppercase tracking-[0.1em] text-slate-400 hidden md:table-cell">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.image || `https://ui-avatars.com/api/?name=${user.username}&background=ede9fe&color=6d28d9`}
                          alt={user.username}
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100"
                        />
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{user.username}</p>
                          <p className="text-xs text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 hidden md:table-cell">
                      <span className="text-sm text-slate-600">{user.phone || "—"}</span>
                    </td>
                    <td className="py-4 px-6 text-center">{getRoleBadge(user.role)}</td>
                    <td className="py-4 px-6 text-center">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        disabled={updatingRole === user._id}
                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all disabled:opacity-50 bg-white"
                      >
                        <option value="user">User</option>
                        <option value="hotelOwner">Hotel Owner</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-right hidden md:table-cell">
                      <span className="text-xs text-slate-400">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
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
                  onClick={() => fetchUsers(pagination.page - 1, activeTab === "all" ? "" : activeTab)}
                  disabled={pagination.page <= 1}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 transition-all"
                >
                  Previous
                </button>
                <button
                  onClick={() => fetchUsers(pagination.page + 1, activeTab === "all" ? "" : activeTab)}
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

export default AdminUsers;
