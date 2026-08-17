import HotelCard from "./HotelCard";
import Title from "./Title";
import { useAppContext } from "../context/AppContext";
import { extraHotelsDummyData } from "../assets/assets";

const FeaturedDestination = () => {
  const { rooms, navigate } = useAppContext();

  const displayRooms = rooms.length > 0 ? rooms.slice(0, 4) : extraHotelsDummyData;

  if (rooms.length === 0) {
    return (
      <div className="py-24 px-6 md:px-16 lg:px-24">
        <Title
          title="Featured Destination"
          subtitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
        />
        <div className="flex flex-wrap justify-center gap-6 mt-16">
          {extraHotelsDummyData.map((hotel, index) => (
            <div
              key={hotel._id}
              className="max-w-70 w-full rounded-2xl overflow-hidden bg-white shadow-sm hover-lift card-glow group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 text-xs bg-amber-50 text-amber-700 font-medium rounded-full shadow-md">
                  {hotel.city}
                </span>
              </div>
              <div className="p-4">
                <p className="text-sm font-bold text-slate-900">{hotel.name}</p>
                <p className="text-xs text-slate-500 mt-1">{hotel.address}</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-xs text-amber-500">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                  <span className="text-xs text-slate-400 ml-1">Excellent</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-16">
          <button
            onClick={() => {
              navigate("/rooms");
              scrollTo(0, 0);
            }}
            className="rounded-full bg-slate-900 text-white px-8 py-3 text-sm font-medium hover:bg-slate-800 transition cursor-pointer btn-press"
          >
            View All Destinations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 px-6 md:px-16 lg:px-24">
      <Title
        title="Featured Destination"
        subtitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
      />

      <div className="flex flex-wrap justify-center gap-6 mt-16">
        {displayRooms.map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
        ))}
      </div>
      <div className="flex justify-center mt-16">
        <button
          onClick={() => {
            navigate("/rooms");
            scrollTo(0, 0);
          }}
          className="rounded-full bg-slate-900 text-white px-8 py-3 text-sm font-medium hover:bg-slate-800 transition cursor-pointer btn-press"
        >
          View All Destinations
        </button>
      </div>
    </div>
  );
};

export default FeaturedDestination;
