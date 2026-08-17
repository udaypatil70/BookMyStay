import HotelCard from "./HotelCard";
import Title from "./Title";
import { useAppContext } from "../context/AppContext";

const FeaturedDestination = () => {
  const { rooms, navigate } = useAppContext();

  if (rooms.length === 0) {
    return (
      <div className="py-24 px-6 md:px-16 lg:px-24">
        <Title
          title="Featured Destination"
          subtitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
        />
        <div className="flex flex-wrap justify-center gap-6 mt-16">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="max-w-70 w-full rounded-2xl overflow-hidden bg-white shadow-sm">
              <div className="skeleton h-48 w-full" />
              <div className="p-4 space-y-3">
                <div className="skeleton h-5 w-3/4" />
                <div className="skeleton h-4 w-1/2" />
                <div className="skeleton h-4 w-full" />
              </div>
            </div>
          ))}
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
        {rooms.slice(0, 4).map((room, index) => (
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
