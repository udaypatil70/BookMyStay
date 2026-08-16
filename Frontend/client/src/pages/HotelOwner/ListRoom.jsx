import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ListRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    roomType: "",
    pricePerNight: "",
    amenities: {},
  });
  const [editImages, setEditImages] = useState({});
  const [editLoading, setEditLoading] = useState(false);
  const { axios, getToken, user, currency } = useAppContext();
  const navigate = useNavigate();

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

  const handleEditClick = (room) => {
    setEditingRoom(room);
    const amenityMap = {
      "Free WiFi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
    };
    room.amenities.forEach((a) => {
      if (amenityMap.hasOwnProperty(a)) amenityMap[a] = true;
    });
    setEditForm({
      roomType: room.roomType,
      pricePerNight: room.pricePerNight,
      amenities: amenityMap,
    });
    setEditImages({});
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    try {
      const formData = new FormData();
      formData.append("roomId", editingRoom._id);
      formData.append("roomType", editForm.roomType);
      formData.append("pricePerNight", editForm.pricePerNight);

      const amenities = Object.keys(editForm.amenities).filter(
        (key) => editForm.amenities[key],
      );
      formData.append("amenities", JSON.stringify(amenities));

      Object.keys(editImages).forEach((key) => {
        if (editImages[key]) {
          formData.append("images", editImages[key]);
        }
      });

      const { data } = await axios.put("/api/rooms/update", formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        toast.success(data.message);
        setShowEditModal(false);
        setEditingRoom(null);
        fetchRooms();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async (roomId) => {
    if (!confirm("Are you sure you want to delete this room?")) return;
    try {
      const { data } = await axios.delete("/api/rooms/delete", {
        data: { roomId },
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
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
          <table className="w-full min-w-[850px]">
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
                <th className="py-3 px-6 text-center text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {rooms.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-16 text-center">
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
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all duration-200"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-all duration-200"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && editingRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-bounce-in">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Edit Room</h2>
              <button
                onClick={() => { setShowEditModal(false); setEditingRoom(null); }}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-6">
              {/* Current Images */}
              <div>
                <p className="text-sm font-medium text-slate-700 mb-3">Current Images</p>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {editingRoom.images?.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Room ${i + 1}`}
                      className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                    />
                  ))}
                </div>
              </div>

              {/* Add New Images */}
              <div>
                <p className="text-sm font-medium text-slate-700 mb-3">Add New Images (optional)</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[1, 2, 3, 4].map((key) => (
                    <label
                      key={key}
                      className={`flex items-center justify-center rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 aspect-square ${
                        editImages[key]
                          ? "border-blue-300 bg-blue-50"
                          : "border-slate-200 hover:border-blue-300 hover:bg-blue-50/30"
                      }`}
                    >
                      {editImages[key] ? (
                        <img
                          src={URL.createObjectURL(editImages[key])}
                          alt={`New ${key}`}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : (
                        <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => setEditImages({ ...editImages, [key]: e.target.files[0] })}
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Room Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Room Type</label>
                  <select
                    value={editForm.roomType}
                    onChange={(e) => setEditForm({ ...editForm, roomType: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-white"
                  >
                    <option value="Single Bed">Single Bed</option>
                    <option value="Double Bed">Double Bed</option>
                    <option value="Luxury Room">Luxury Room</option>
                    <option value="Family Suite">Family Suite</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Price per Night</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                    <input
                      type="number"
                      value={editForm.pricePerNight}
                      onChange={(e) => setEditForm({ ...editForm, pricePerNight: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 pl-8 pr-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <p className="text-sm font-medium text-slate-700 mb-3">Amenities</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.keys(editForm.amenities).map((amenity, i) => (
                    <label
                      key={i}
                      className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                        editForm.amenities[amenity]
                          ? "border-blue-300 bg-blue-50 ring-1 ring-blue-200"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={editForm.amenities[amenity]}
                        onChange={() =>
                          setEditForm({
                            ...editForm,
                            amenities: {
                              ...editForm.amenities,
                              [amenity]: !editForm.amenities[amenity],
                            },
                          })
                        }
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                        editForm.amenities[amenity]
                          ? "border-blue-500 bg-blue-500"
                          : "border-slate-300"
                      }`}>
                        {editForm.amenities[amenity] && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-slate-700">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={editLoading}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed btn-press"
                >
                  {editLoading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setEditingRoom(null); }}
                  className="px-6 py-3 rounded-xl text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListRoom;
