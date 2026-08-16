import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ListRoom = () => {
  const [rooms, setRooms] = useState([]);
  const { axios, getToken, user, currency } = useAppContext();

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get("/api/rooms/owner", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const toggleAvailability = async (roomId) => {
    try {
      const { data } = await axios.post(
        "/api/rooms/toggle-availability",
        { roomId },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);
        fetchRooms();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRooms();
    }
  }, [user]);

  const availableCount = rooms.filter((r) => r.isAvailable).length;
  const unavailableCount = rooms.filter((r) => !r.isAvailable).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
          Room Listings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          View, edit, or manage all listed rooms. Keep information up-to-date.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="flex flex-wrap gap-3">
        <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-slate-400">Total</p>
            <p className="text-sm font-semibold text-slate-800">{rooms.length}</p>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Available</p>
            <p className="text-sm font-semibold text-emerald-600">{availableCount}</p>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-red-500" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Unavailable</p>
            <p className="text-sm font-semibold text-red-600">{unavailableCount}</p>
          </div>
        </div>
      </div>

      {/* Rooms Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">All Rooms</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="py-3 px-6 text-left text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
                  Room Type
                </th>
                <th className="py-3 px-6 text-left text-xs font-semibold uppercase tracking-[0.1em] text-slate-400 hidden md:table-cell">
                  Amenities
                </th>
                <th className="py-3 px-6 text-left text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
                  Price / Night
                </th>
                <th className="py-3 px-6 text-center text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
                  Status
                </th>
                <th className="py-3 px-6 text-center text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
                  Available
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {rooms.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-16 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-slate-600">No rooms listed</p>
                      <p className="text-xs text-slate-400 mt-1">Add your first room to get started.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                rooms.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-50/50 transition-colors duration-150"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          item.isAvailable
                            ? "bg-blue-50 text-blue-600"
                            : "bg-slate-100 text-slate-400"
                        }`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {item.roomType}
                          </p>
                          <p className="text-xs text-slate-400 md:hidden">
                            {item.amenities.join(", ")}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1.5">
                        {item.amenities.map((amenity, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-xs font-medium text-slate-600"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm font-semibold text-slate-800">
                        {currency}{item.pricePerNight}
                      </span>
                      <span className="text-xs text-slate-400">/night</span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {item.isAvailable ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-slate-100 text-slate-500 ring-1 ring-slate-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => toggleAvailability(item._id)}
                        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          item.isAvailable ? "bg-blue-600" : "bg-slate-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${
                            item.isAvailable ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListRoom;
