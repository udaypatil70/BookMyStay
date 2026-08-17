import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { assets, facilityIcons, roomCommonData } from "../assets/assets";
import StarRating from "../components/StarRating";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const RoomDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { rooms, getToken, axios, navigate, user, favourites, toggleFavourite } = useAppContext();

  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [checkInDate, setCheckInDate] = useState(
    searchParams.get("checkIn") || "",
  );
  const [checkOutDate, setCheckOutDate] = useState(
    searchParams.get("checkOut") || "",
  );
  const [guests, setGuests] = useState(searchParams.get("guests") || 1);
  const [isAvailable, setIsAvailable] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [reviewLoading, setReviewLoading] = useState(false);

  const isFavourite = room ? favourites.includes(room.hotel._id) : false;

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/reviews/room/${id}`);
      if (data.success) {
        setReviews(data.reviews);
        setTotalReviews(data.totalReviews);
        setAvgRating(data.avgRating);
      }
    } catch {}
  };

  const handleFavourite = () => {
    if (!user) {
      toast.error("Please login to add favourites");
      return;
    }
    toggleFavourite(room.hotel._id);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewForm.comment.trim() || reviewForm.comment.trim().length < 3) {
      toast.error("Comment must be at least 3 characters");
      return;
    }
    setReviewLoading(true);
    try {
      const { data } = await axios.post(
        "/api/reviews",
        {
          roomId: id,
          rating: reviewForm.rating,
          comment: reviewForm.comment,
        },
        { headers: { Authorization: `Bearer ${await getToken()}` } },
      );
      if (data.success) {
        toast.success(data.message);
        setReviewForm({ rating: 5, comment: "" });
        fetchReviews();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setReviewLoading(false);
    }
  };

  const checkAvailability = async () => {
    try {
      if (!checkInDate || !checkOutDate) {
        toast.error("Please select check-in and check-out dates");
        return;
      }
      if (checkInDate >= checkOutDate) {
        toast.error("Check-in date should be before check-out date");
        return;
      }
      const { data } = await axios.post("/api/bookings/check-availability", {
        room: id,
        checkInDate,
        checkOutDate,
      });
      if (data.success) {
        if (data.isAvailable) {
          setIsAvailable(true);
          toast.success("Room is available");
        } else {
          setIsAvailable(false);
          toast.error("Room is not available for the selected dates");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      if (!isAvailable) {
        return checkAvailability();
      } else {
        const { data } = await axios.post(
          "/api/bookings/book",
          {
            room: id,
            checkInDate,
            checkOutDate,
            guests,
            paymentMethod: "Pay At Hotel",
          },
          {
            headers: { Authorization: `Bearer ${await getToken()}` },
          },
        );
        if (data.success) {
          toast.success(data.message);
          navigate("/my-bookings");
          scrollTo(0, 0);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const room = rooms?.find((room) => room._id === id);

    if (room) {
      setRoom(room);
      setMainImage(room.images?.[0]);
    }
  }, [rooms, id]);

  useEffect(() => {
    if (room) fetchReviews();
  }, [room, id]);

  useEffect(() => {
    setIsAvailable(false);
  }, [checkInDate, checkOutDate]);

  return (
    room && (
      <div className="pt-28 md:pt-36 px-6 md:px-16 lg:px-24">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 animate-fade-in-up">
          <div>
            <h1 className="font-playfair text-3xl md:text-4xl text-slate-900">
              {room.hotel.name}
            </h1>
            <span className="text-sm text-slate-500">{room.roomType}</span>
          </div>
          <button
            onClick={handleFavourite}
            className="ml-auto w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-red-50 btn-press"
          >
            <svg
              className={`w-5 h-5 transition-colors duration-300 ${isFavourite ? "text-red-500 fill-red-500" : "text-slate-400"}`}
              fill={isFavourite ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-1 mt-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <StarRating rating={avgRating || 4} />
          <p className="ml-2 text-slate-500 text-sm">{totalReviews > 0 ? `${totalReviews} Reviews` : "No Reviews Yet"}</p>
        </div>

        <div className="flex items-center gap-2 text-slate-500 mt-2 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          <img src={assets.locationIcon} alt="location-icon" />
          <span>{room.hotel.address}</span>
        </div>

        <div className="flex flex-col lg:flex-row mt-6 gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="lg:w-1/2 w-full img-zoom rounded-2xl overflow-hidden">
            <img
              src={mainImage}
              alt="Room"
              className="w-full shadow-lg object-cover transition-transform duration-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
            {room.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Room ${index + 1}`}
                onClick={() => setMainImage(image)}
                className={`w-full rounded-xl shadow-md object-cover cursor-pointer transition-all duration-300 ${
                  mainImage === image ? "ring-2 ring-amber-500 scale-[1.02]" : "hover:scale-[1.02] hover:shadow-lg"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between mt-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex flex-col">
            <h1 className="font-playfair text-3xl text-slate-900">
              Experience Luxury Like Never Before
            </h1>

            <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
              {room.amenities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 transition-all duration-300 hover:bg-primary/10 hover:text-primary cursor-default"
                >
                  <img
                    src={facilityIcons[item]}
                    alt={item}
                    className="w-5 h-5"
                  />
                  <p className="text-xs text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-2xl font-semibold text-slate-900">${room.pricePerNight}/night</p>
        </div>

        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mx-auto mt-16 max-w-6xl animate-slide-in-bottom"
        >
          <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10">
            <div className="flex flex-col">
              <label htmlFor="checkInDate" className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Check-In
              </label>
              <input
                onChange={(e) => setCheckInDate(e.target.value)}
                value={checkInDate}
                min={new Date().toISOString().split("T")[0]}
                type="date"
                id="checkInDate"
                placeholder="check-In"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 mt-1.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                required
              />
            </div>

            <div className="w-px h-15 bg-slate-200 max-md:hidden"></div>

            <div className="flex flex-col">
              <label htmlFor="checkOutDate" className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Check-Out
              </label>
              <input
                onChange={(e) => setCheckOutDate(e.target.value)}
                value={checkOutDate}
                min={checkInDate}
                disabled={!checkInDate}
                type="date"
                id="checkOutDate"
                placeholder="check-Out"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 mt-1.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 disabled:opacity-50"
                required
              />
            </div>

            <div className="w-px h-15 bg-slate-200 max-md:hidden"></div>

            <div className="flex flex-col">
              <label htmlFor="guests" className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Guests
              </label>
              <input
                onChange={(e) => setGuests(e.target.value)}
                value={guests}
                type="number"
                id="guests"
                placeholder="1"
                className="max-w-20 rounded-xl border border-slate-200 px-4 py-3 mt-1.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-slate-900 hover:bg-slate-800 active:scale-95 transition-all duration-300 text-white rounded-full max-md:w-full max-md:mt-6 px-12 py-3 text-base cursor-pointer hover:shadow-lg btn-press"
          >
            {isAvailable ? "Book Now" : "Check Availability"}
          </button>
        </form>

        <div className="mt-25 space-y-4 stagger-children">
          {roomCommonData.map((spec, index) => (
            <div key={index} className="flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-slate-50">
              <img
                src={spec.icon}
                alt={`${spec.title}-icon`}
                className="w-6.5"
              />

              <div>
                <p className="text-base">{spec.title}</p>
                <p className="text-slate-500">{spec.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl border-y border-slate-200 my-15 py-10 text-slate-500 leading-relaxed">
          <p>
            Guests will be allocated on the ground floor according to
            availability. You get a comfortable Two bedroom apartment has a true
            city feeling. The price quoted is for two guests, at the guest slot
            please mark the number of guests to get the exact price for groups.
            The Guests will be allocated ground floor according to availability.
            You get the comfortable two bedroom apartment that has a true city
            feeling.
          </p>
        </div>

        <div className="mt-16 animate-fade-in-up">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-playfair text-2xl text-slate-900">Guest Reviews</h2>
              <p className="text-sm text-slate-500 mt-1">
                {totalReviews > 0
                  ? `${avgRating} average from ${totalReviews} review${totalReviews !== 1 ? "s" : ""}`
                  : "Be the first to review this room"}
              </p>
            </div>
            {totalReviews > 0 && (
              <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-xl">
                <span className="text-2xl font-bold text-amber-600">{avgRating}</span>
                <StarRating rating={Math.round(avgRating)} />
              </div>
            )}
          </div>

          <div className="space-y-4 mb-8">
            {reviews.length === 0 ? (
              <div className="bg-slate-50 rounded-2xl p-8 text-center">
                <svg className="w-12 h-12 mx-auto text-slate-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-slate-500 text-sm">No reviews yet. Be the first to share your experience!</p>
              </div>
            ) : (
              reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover-lift"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={review.user?.image || "https://ui-avatars.com/api/?name=User&background=random"}
                      alt={review.user?.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-slate-800 text-sm">{review.user?.username || "Guest"}</p>
                        <span className="text-xs text-slate-400">
                          {new Date(review.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <StarRating rating={review.rating} />
                      {review.comment && (
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed">{review.comment}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {user && (
            <div className="bg-slate-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Write a Review</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Rating</label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        className="transition-transform duration-200 hover:scale-125"
                      >
                        <svg
                          className={`w-7 h-7 ${star <= reviewForm.rating ? "text-amber-400 fill-amber-400" : "text-slate-300"}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-slate-500">{reviewForm.rating}/5</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Your Review</label>
                  <textarea
                    rows="3"
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    placeholder="Share your experience (min 3 characters)"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-300 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={reviewLoading}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:shadow-lg btn-press disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
                >
                  {reviewLoading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </button>
              </form>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 mt-16">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <img
              src={room.hotel.owner.image}
              alt={room.hotel.name}
              className="h-14 w-14 md:h-18 rounded-full object-cover ring-2 ring-slate-200"
            />
            <div className="flex flex-col gap-2">
              <p className="text-lg md:text-xl text-slate-900">Hosted By {room.hotel.name}</p>
              <div className="flex items-center gap-2">
                <StarRating rating={avgRating || 4} />
                <p className="text-sm text-slate-500">{totalReviews > 0 ? `${totalReviews} reviews` : "No reviews yet"}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => { navigate("/contact"); scrollTo(0, 0); }}
            className="px-6 py-2.5 mt-4 rounded-full text-white bg-slate-900 hover:bg-slate-800 transition-all duration-300 cursor-pointer hover:shadow-lg btn-press"
          >
            Contact Now
          </button>
        </div>
      </div>
    )
  );
};

export default RoomDetails;