import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const PendingApprovals = () => {
  const { axios, getToken } = useAppContext();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const fetchPending = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const { data } = await axios.get("/api/admin/hotels/pending", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setHotels(data.hotels);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleApprove = async (hotelId) => {
    try {
      setActionLoading(true);
      const token = await getToken();
      const { data } = await axios.post(
        "/api/admin/hotels/approve",
        { hotelId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success("Hotel approved successfully");
        setHotels((prev) => prev.filter((h) => h._id !== hotelId));
        setSelectedHotel(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (hotelId) => {
    if (rejectReason.trim().length < 10) {
      toast.error("Rejection reason must be at least 10 characters");
      return;
    }
    try {
      setActionLoading(true);
      const token = await getToken();
      const { data } = await axios.post(
        "/api/admin/hotels/reject",
        { hotelId, reason: rejectReason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success("Hotel rejected");
        setHotels((prev) => prev.filter((h) => h._id !== hotelId));
        setShowRejectModal(false);
        setSelectedHotel(null);
        setRejectReason("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Pending Approvals</h1>
        <p className="text-sm text-slate-500 mt-1">Review and approve hotel registrations.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-[3px] border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : hotels.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-slate-700">All caught up!</p>
          <p className="text-xs text-slate-400 mt-1">No pending hotel submissions to review.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {hotels.map((hotel) => (
            <div
              key={hotel._id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 hover:shadow-md hover:border-slate-300/60 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{hotel.name}</h3>
                    <p className="text-sm text-slate-500 mt-0.5">{hotel.address}, {hotel.city}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-slate-400">Owner: {hotel.owner?.username} ({hotel.owner?.email})</span>
                      <span className="text-xs text-slate-400">Phone: {hotel.contact}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Submitted: {new Date(hotel.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
                    {hotel.documents && hotel.documents.length > 0 && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-slate-400">Documents:</span>
                        {hotel.documents.map((doc, i) => (
                          <a
                            key={i}
                            href={doc}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-indigo-600 hover:text-indigo-700 font-medium underline-offset-2 hover:underline"
                          >
                            View {i + 1}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-16 md:ml-0">
                  <button
                    onClick={() => handleApprove(hotel._id)}
                    disabled={actionLoading}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-all disabled:opacity-50 shadow-sm shadow-emerald-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Approve
                  </button>
                  <button
                    onClick={() => { setSelectedHotel(hotel); setShowRejectModal(true); }}
                    disabled={actionLoading}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-all disabled:opacity-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showRejectModal && selectedHotel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 border border-slate-200/60">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Reject Hotel</h2>
            <p className="text-sm text-slate-500 mb-4">
              Provide a reason for rejecting <strong className="text-slate-700">{selectedHotel.name}</strong>. The owner will be notified via email.
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter rejection reason (min 10 characters)..."
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all resize-none h-28"
            />
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => handleReject(selectedHotel._id)}
                disabled={actionLoading || rejectReason.trim().length < 10}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 transition-all disabled:opacity-50 shadow-sm"
              >
                {actionLoading ? "Rejecting..." : "Confirm Reject"}
              </button>
              <button
                onClick={() => { setShowRejectModal(false); setSelectedHotel(null); setRejectReason(""); }}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingApprovals;
