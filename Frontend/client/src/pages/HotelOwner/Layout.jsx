import { useEffect } from "react";
import Navbar from "../../components/HotelOwner/Navbar";
import Sidebar from "../../components/HotelOwner/Sidebar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import PendingApproval from "./PendingApproval";

const Layout = () => {
  const { isOwner, hotelStatus, navigate } = useAppContext();

  useEffect(() => {
    if (!isOwner && hotelStatus !== "pending" && hotelStatus !== "rejected") {
      navigate("/");
    }
  }, [isOwner, hotelStatus]);

  if (hotelStatus === "pending" || hotelStatus === "rejected") {
    return (
      <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-emerald-50/20 to-slate-50">
        <Navbar />
        <PendingApproval />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-emerald-50/20 to-slate-50">
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

export default Layout;
