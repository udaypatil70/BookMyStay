import { useEffect, useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "",
);

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

  // Cancel a booking
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

  // Stripe payment
  const handlePayment = async (bookingId) => {
    try {
      const { data } = await axios.post(
        "/api/bookings/create-payment-intent",
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

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        lineItems: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Hotel Booking Payment",
                description: `Booking ID: ${bookingId}`,
              },
              unit_amount: Math.round(data.amount * 100),
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        successUrl: `${window.location.origin}/my-bookings?payment=success`,
        cancelUrl: `${window.location.origin}/my-bookings?payment=cancelled`,
      });

      if (error) {
        toast.error(error.message);
      }
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
    return checkIn > now; // Can cancel before check-in
  };

  const canPay = (booking) => {
    return !booking.isPaid && booking.status !== "cancelled";
  };

  return (
    <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
      <Title
        title="My Bookings"
        subtitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks"
        align="left"
      />

      <div className="max-w-6xl mt-8 w-full text-gray-800">
        <div className="hidden md:grid grid-cols-[3fr_2fr_1fr_1fr] border-b border-gray-300 font-medium text-base py-3">
          <div>Hotels</div>
          <div>Date & Timings</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {loading ? (
          <div className="py-10 text-center text-gray-500">
            Loading bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            No bookings found. Start by exploring our rooms!
          </div>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr_1fr] w-full border-b border-gray-300 py-6 first:border-t"
            >
              {/* Hotel Details */}
              <div className="flex flex-col md:flex-row">
                <img
                  src={booking.room?.images?.[0]}
                  alt="hotel-img"
                  className="min-md:w-44 rounded shadow object-cover"
                />
                <div className="flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4">
                  <p className="font-playfair text-2xl">
                    {booking.hotel?.name}
                    <span className="font-inter text-sm">
                      ({booking.room?.roomType})
                    </span>
                  </p>
                  <div className="flex item-center gap-1 text-sm text-gray-500">
                    <img src={assets.locationIcon} alt="location-icon" />
                    <span>{booking.hotel?.address}</span>
                  </div>
                  <div className="flex item-center gap-1 text-sm text-gray-500">
                    <img src={assets.guestsIcon} alt="Guest-icon" />
                    <span>{booking.guests} Guest{booking.guests > 1 ? "s" : ""}</span>
                  </div>
                  <p className="text-base">
                    Total: {currency}{booking.totalPrice}
                  </p>
                </div>
              </div>

              {/* Date & Timings */}
              <div className="flex flex-row md:items-center md:gap-12 mt-3 gap-8">
                <div>
                  <p>Check-In:</p>
                  <p className="text-gray-500 text-sm">
                    {new Date(booking.checkInDate).toDateString()}
                  </p>
                </div>

                <div>
                  <p>Check-Out:</p>
                  <p className="text-gray-500 text-sm">
                    {new Date(booking.checkOutDate).toDateString()}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex flex-col items-start justify-center pt-3">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(booking.status, booking.isPaid)}`}
                >
                  {getStatusLabel(booking.status, booking.isPaid)}
                </span>
                <p className="text-xs text-gray-400 mt-1">
                  {booking.paymentMethod}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col items-start justify-center pt-3 gap-2">
                {canPay(booking) && (
                  <button
                    onClick={() => handlePayment(booking._id)}
                    className="px-4 py-1.5 text-xs bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all cursor-pointer"
                  >
                    Pay Now
                  </button>
                )}
                {canCancel(booking) && (
                  <button
                    onClick={() => cancelBooking(booking._id)}
                    className="px-4 py-1.5 text-xs border border-red-400 text-red-500 rounded-full hover:bg-red-50 transition-all cursor-pointer"
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
