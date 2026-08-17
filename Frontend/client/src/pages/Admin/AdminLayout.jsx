import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/Sidebar";

const AdminLayout = () => {
  const { axios, getToken, navigate } = useAppContext();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const token = await getToken();
        if (!token) {
          navigate("/");
          return;
        }
        const { data } = await axios.get("/api/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data.success) {
          setIsAdmin(true);
        } else {
          navigate("/");
        }
      } catch {
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    checkAdmin();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-[3px] border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-400 font-medium">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-slate-50">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 md:p-8 lg:p-10 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
