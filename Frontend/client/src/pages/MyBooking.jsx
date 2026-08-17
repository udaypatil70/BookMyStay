import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const MyBooking = () => {
  const { axios, getToken, user, currency } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/user", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    try {
      const { data } = await axios.post(
        "/api/bookings/cancel",
        { bookingId },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      );

      if (data.success) {
        toast.success("Booking cancelled successfully");
        fetchUserBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handlePayment = async (bookingId) => {
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error("Failed to load payment SDK. Please try again.");
        return;
      }

      const { data } = await axios.post(
        "/api/bookings/create-razorpay-order",
        { bookingId },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      );

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      const options = {
        key: data.keyId,
        amount: data.amount * 100,
        currency: data.currency,
        name: "BookMyStay",
        description: `Booking Payment`,
        order_id: data.orderId,
        handler: async function (response) {
          try {
            const { data: verifyData } = await axios.post(
              "/api/bookings/verify-payment",
              {
                bookingId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${await getToken()}`,
                },
              },
            );

            if (verifyData.success) {
              toast.success("Payment successful! Booking confirmed.");
              fetchUserBookings();
            } else {
              toast.error(verifyData.message);
            }
          } catch {
            toast.error("Payment verification failed. Contact support.");
          }
        },
        prefill: {
          name: user?.username || "",
          email: user?.email || "",
        },
        theme: {
          color: "#1a1a1a",
        },
        modal: {
          ondismiss: function () {
            toast("Payment cancelled");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        toast.error(response.error?.description || "Payment failed");
      });
      rzp.open();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserBookings();
    }
  }, [user]);

  const getStatusColor = (status, isPaid) => {
    if (status === "cancelled") return "bg-red-100 text-red-600";
    if (status === "confirmed" || isPaid) return "bg-green-100 text-green-600";
    return "bg-amber-100 text-amber-600";
  };

  const getStatusLabel = (status, isPaid) => {
    if (status === "cancelled") return "Cancelled";
    if (status === "confirmed") return "Confirmed";
    if (isPaid) return "Paid";
    return "Pending";
  };

  const canCancel = (booking) => {
    if (booking.status === "cancelled") return false;
    const checkIn = new Date(booking.checkInDate);
    const now = new Date();
    return checkIn > now;
  };

  const canPay = (booking) => {
    return !booking.isPaid && booking.status !== "cancelled";
  };

  return (
    <div className="py-28 md:pb-36 md:pt-32 px-6 md:px-16 lg:px-24">
      <Title
        title="My Bookings"
        subtitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks."
        align="left"
      />

      <div className="max-w-6xl mt-8 w-full text-gray-800">
        <div className="hidden md:grid grid-cols-[3fr_2fr_1fr_1fr] border-b border-slate-200 py-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Hotels</div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Date & Timings</div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Status</div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Actions</div>
        </div>

        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr_1fr] w-full border-b border-slate-100 py-6 first:border-t">
                <div className="flex flex-col md:flex-row">
                  <div className="skeleton min-md:w-44 h-32 rounded-xl" />
                  <div className="flex flex-col gap-2 max-md:mt-3 min-md:ml-4">
                    <div className="skeleton h-6 w-40 rounded-lg" />
                    <div className="skeleton h-4 w-32 rounded-lg" />
                    <div className="skeleton h-4 w-24 rounded-lg" />
                    <div className="skeleton h-4 w-20 rounded-lg" />
                  </div>
                </div>
                <div className="flex flex-row md:items-center md:gap-12 mt-3 gap-8">
                  <div>
                    <div className="skeleton h-4 w-16 mb-1 rounded-lg" />
                    <div className="skeleton h-3 w-28 rounded-lg" />
                  </div>
                  <div>
                    <div className="skeleton h-4 w-16 mb-1 rounded-lg" />
                    <div className="skeleton h-3 w-28 rounded-lg" />
                  </div>
                </div>
                <div className="flex flex-col items-start justify-center pt-3">
                  <div className="skeleton h-6 w-20 rounded-full" />
                </div>
                <div className="flex flex-col items-start justify-center pt-3 gap-2">
                  <div className="skeleton h-7 w-20 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="py-20 text-center animate-fade-in-up">
            <div className="text-6xl mb-4">🏨</div>
            <p className="text-slate-500 text-lg mb-2">No bookings found</p>
            <p className="text-slate-400 text-sm mb-6">Start by exploring our rooms!</p>
            <Link
              to="/rooms"
              onClick={() => scrollTo(0, 0)}
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-slate-800 hover:shadow-lg btn-press"
            >
              Explore Rooms
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        ) : (
          bookings.map((booking, index) => (
            <div
              key={booking._id}
              className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr_1fr] w-full border-b border-slate-100 py-6 first:border-t animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row">
                <img
                  src={booking.room?.images?.[0]}
                  alt="hotel-img"
                  className="min-md:w-44 rounded-xl shadow object-cover img-zoom"
                />
                <div className="flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4">
                  <p className="font-playfair text-xl text-slate-900">
                    {booking.hotel?.name}
                    <span className="text-sm text-slate-500">
                      ({booking.room?.roomType})
                    </span>
                  </p>
                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <img src={assets.locationIcon} alt="location-icon" />
                    <span>{booking.hotel?.address}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <img src={assets.guestsIcon} alt="Guest-icon" />
                    <span>{booking.guests} Guest{booking.guests > 1 ? "s" : ""}</span>
                  </div>
                  <p className="text-base text-slate-700">
                    Total: {currency}{booking.totalPrice}
                  </p>
                </div>
              </div>

              <div className="flex flex-row md:items-center md:gap-12 mt-3 gap-8">
                <div>
                  <p className="text-slate-700">Check-In:</p>
                  <p className="text-slate-500 text-sm">
                    {new Date(booking.checkInDate).toDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-slate-700">Check-Out:</p>
                  <p className="text-slate-500 text-sm">
                    {new Date(booking.checkOutDate).toDateString()}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-start justify-center pt-3">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-all duration-300 ${getStatusColor(booking.status, booking.isPaid)}`}
                >
                  {getStatusLabel(booking.status, booking.isPaid)}
                </span>
                <p className="text-xs text-slate-400 mt-1">
                  {booking.paymentMethod}
                </p>
              </div>

              <div className="flex flex-col items-start justify-center pt-3 gap-2">
                {canPay(booking) && (
                  <button
                    onClick={() => handlePayment(booking._id)}
                    className="px-4 py-1.5 text-xs bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-blue-500/30 btn-press"
                  >
                    Pay Now
                  </button>
                )}
                {canCancel(booking) && (
                  <button
                    onClick={() => cancelBooking(booking._id)}
                    className="px-4 py-1.5 text-xs border border-red-300 text-red-500 rounded-full hover:bg-red-50 transition-all duration-300 cursor-pointer btn-press"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBooking;
