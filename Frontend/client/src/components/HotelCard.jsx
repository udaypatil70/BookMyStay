
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const HotelCard = ({ room, index }) => {
  const { favourites, toggleFavourite, user } = useAppContext();
  const isFavourite = favourites.includes(room.hotel._id);

  const handleFavourite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.error("Please login to add favourites");
      return;
    }
    toggleFavourite(room.hotel._id);
  };

  return (
    <Link
      to={`/rooms/${room._id}`}
      onClick={() => scrollTo(0, 0)}
      key={room._id}
      className="group relative max-w-70 w-full rounded-2xl overflow-hidden bg-white shadow-sm hover-lift card-glow"
    >
      <div className="img-zoom">
        <img src={room.images[0]} alt={room.hotel.name} className="aspect-[4/3] object-cover w-full" />
      </div>

      <button
        onClick={handleFavourite}
        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md transition-all duration-300 hover:scale-110 hover:bg-white btn-press"
      >
        <svg
          className={`w-5 h-5 transition-colors duration-300 ${
            isFavourite ? "text-red-500 fill-red-500" : "text-gray-400"
          }`}
          fill={isFavourite ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {index === 0 && (
        <p className="px-3 py-1 absolute top-3 left-3 text-xs bg-amber-50 text-amber-700 font-medium rounded-full shadow-md">
          Best Seller
        </p>
      )}

      <div className="p-4 pt-5">
        <p className="font-playfair text-lg text-slate-900">
          {room.hotel.name}
        </p>
        <div className="flex items-center gap-2 text-sm mt-1">
          <img src={assets.locationIcon} alt="location-icon" />
          <span>{room.hotel.address}</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-slate-900">
            <span className="font-semibold">${room.pricePerNight}</span>
            <span className="text-slate-500"> /night</span>
          </p>
          <button className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-full hover:bg-slate-900 hover:text-white transition-all duration-300 cursor-pointer btn-press">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
