import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { currency, user, getToken, toast, axios } = useAppContext();

  const [dashboardData, setDashboardData] = useState({
    bookings: [],
    totalBookings: 0,
    totalRevenue: 0,
  });

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/bookings/hotel", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Dashboard"
        subtitle="Monitor your room listings, track bookings and analyze revenue—all in one place. Stay updated with real-time insights to ensure smooth operations."
      />

      <div className="grid gap-6 my-8 md:grid-cols-2">
        <div className="bg-white rounded-[28px] shadow-sm p-6 flex items-center gap-4">
          <img
            src={assets.totalBookingIcon}
            alt="Bookings"
            className="h-12 w-12"
          />
          <div>
            <p className="text-sm text-slate-500 uppercase tracking-[0.2em]">
              Total Bookings
            </p>
            <p className="text-3xl font-semibold text-slate-900 mt-2">
              {dashboardData.totalBookings}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[28px] shadow-sm p-6 flex items-center gap-4">
          <img
            src={assets.totalRevenueIcon}
            alt="Revenue"
            className="h-12 w-12"
          />
          <div>
            <p className="text-sm text-slate-500 uppercase tracking-[0.2em]">
              Total Revenue
            </p>
            <p className="text-3xl font-semibold text-slate-900 mt-2">
              {currency} {dashboardData.totalRevenue}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[28px] shadow-sm p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Recent Bookings
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              A quick view of recent activity and payment status for your rooms.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="text-sm text-slate-500 uppercase tracking-[0.1em]">
                <th className="py-4 px-4">User Name</th>
                <th className="py-4 px-4 hidden sm:table-cell">Room Name</th>
                <th className="py-4 px-4 text-center">Total Amount</th>
                <th className="py-4 px-4 text-center">Payment Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700">
              {dashboardData.bookings.map((item, index) => (
                <tr key={index} className="border-t border-slate-200">
                  <td className="py-4 px-4">{item.user.username}</td>
                  <td className="py-4 px-4 hidden sm:table-cell">
                    {item.room.roomType}
                  </td>
                  <td className="py-4 px-4 text-center">{currency} {item.totalPrice}</td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${item.isPaid ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
                    >
                      {item.isPaid ? "Completed" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
