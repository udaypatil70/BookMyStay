import { useState, useMemo, useEffect } from "react";
import { assets, facilityIcons } from "../assets/assets";
import { useSearchParams } from "react-router-dom";
import StarRating from "../components/StarRating";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2.5 text-sm text-slate-600">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
        className="w-4 h-4 rounded accent-primary cursor-pointer"
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2.5 text-sm text-slate-600">
      <input
        type="radio"
        name="sortOption"
        checked={selected}
        onChange={() => onChange(label)}
        className="w-4 h-4 accent-primary cursor-pointer"
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

const AllRooms = () => {
  const [searchParams] = useSearchParams();
  const [openFilters, setOpenFilters] = useState(false);
  const { axios, navigate, currency } = useAppContext();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    roomTypes: [],
    priceRanges: [],
  });

  const [selectedSort, setSelectedSort] = useState("");

  const destination = searchParams.get("destination") || "";
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const guests = searchParams.get("guests") || "";

  const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];
  const priceRanges = [
    "0 to 500",
    "500 to 1000",
    "1000 to 2000",
    "2000 to 3000",
  ];
  const sortOptions = [
    "price Low to High",
    "Price High to Low",
    "Newest First",
  ];

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (checkIn) params.set("checkInDate", checkIn);
      if (checkOut) params.set("checkOutDate", checkOut);

      const queryString = params.toString();
      const url = `/api/rooms${queryString ? `?${queryString}` : ""}`;

      const { data } = await axios.get(url);
      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [checkIn, checkOut]);

  const handleFilterChanage = (checked, value, type) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (checked) {
        updatedFilters[type].push(value);
      } else {
        updatedFilters[type] = updatedFilters[type].filter(
          (item) => item !== value,
        );
      }
      return updatedFilters;
    });
  };

  const handleSortChange = (sortOptions) => {
    setSelectedSort(sortOptions);
  };

  const matchesRoomType = (room) => {
    return (
      selectedFilters.roomTypes.length === 0 ||
      selectedFilters.roomTypes.includes(room.roomType)
    );
  };

  const matchesPriceRange = (room) => {
    return (
      selectedFilters.priceRanges.length === 0 ||
      selectedFilters.priceRanges.some((range) => {
        const [min, max] = range.split(" to ").map(Number);
        return room.pricePerNight >= min && room.pricePerNight <= max;
      })
    );
  };

  const sortRooms = (a, b) => {
    if (selectedSort === "price Low to High") {
      return a.pricePerNight - b.pricePerNight;
    }
    if (selectedSort === "Price High to Low") {
      return b.pricePerNight - a.pricePerNight;
    }
    if (selectedSort === "Newest First") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  };

  const filterDestination = (room) => {
    if (!destination) return true;
    return room.hotel.city.toLowerCase().includes(destination.toLowerCase());
  };

  const filteredRooms = useMemo(() => {
    return rooms
      .filter(
        (room) =>
          matchesRoomType(room) &&
          matchesPriceRange(room) &&
          filterDestination(room),
      )
      .sort(sortRooms);
  }, [rooms, selectedFilters, selectedSort, searchParams]);

  const clearFilters = () => {
    setSelectedFilters({
      roomTypes: [],
      priceRanges: [],
    });
    setSelectedSort("");
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row items-start justify-between gap-8 pt-28 md:pt-36 px-6 md:px-16 lg:px-24">
      <div className="flex-1 min-w-0">
        <div className="flex flex-col items-start text-left mb-10">
          <h1 className="font-playfair text-3xl text-slate-900">
            Hotel Rooms
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-xl">
            Take advantages of our limited-time offers and special packages to
            enhance your stay and create unforgettable memories.
          </p>
          {checkIn && checkOut && (
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
              <img src={assets.calenderIcon} alt="" className="h-4" />
              <span>
                {new Date(checkIn).toLocaleDateString()} -{" "}
                {new Date(checkOut).toLocaleDateString()}
              </span>
              {guests && (
                <span className="text-slate-400">
                  | {guests} Guest{guests > 1 ? "s" : ""}
                </span>
              )}
            </div>
          )}
        </div>

        {loading ? (
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row items-start py-8 gap-6 border-b border-slate-100"
              >
                <div className="skeleton h-64 md:w-1/2 rounded-xl" />
                <div className="md:w-1/2 flex flex-col gap-3">
                  <div className="skeleton h-4 w-24" />
                  <div className="skeleton h-8 w-48" />
                  <div className="skeleton h-4 w-32" />
                  <div className="skeleton h-4 w-64" />
                  <div className="flex gap-3 mt-3">
                    <div className="skeleton h-8 w-24 rounded-full" />
                    <div className="skeleton h-8 w-24 rounded-full" />
                    <div className="skeleton h-8 w-24 rounded-full" />
                  </div>
                  <div className="skeleton h-6 w-28 mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="py-24 text-center animate-fade-in-up">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-50 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-slate-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <p className="text-slate-900 text-lg font-medium mb-1">
              No rooms found
            </p>
            <p className="text-slate-400 text-sm mb-8">
              Try adjusting your filters or search criteria.
            </p>
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-full font-medium text-sm transition-all duration-300 hover:bg-slate-800 hover:shadow-lg"
            >
              Clear Filters
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>
        ) : (
          filteredRooms.map((room, index) => (
            <div
              key={room._id}
              className="flex flex-col md:flex-row items-start gap-6 border-b border-slate-100 py-8 last:pb-24 last:border-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <img
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  scrollTo(0, 0);
                }}
                src={room.images[0]}
                alt="hotel-img"
                title="View Room Details"
                className="max-h-64 md:w-1/2 rounded-xl shadow-md object-cover cursor-pointer img-zoom"
              />
              <div className="md:w-1/2 flex flex-col gap-1.5">
                <p className="text-slate-500 text-sm">{room.hotel.city}</p>
                <p
                  onClick={() => {
                    navigate(`/rooms/${room._id}`);
                    scrollTo(0, 0);
                  }}
                  className="font-playfair text-2xl text-slate-900 cursor-pointer hover:text-secondary transition-colors duration-300"
                >
                  {room.hotel.name}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <StarRating />
                  <p className="ml-1 text-sm text-slate-500">Reviews</p>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 mt-2 text-sm">
                  <img src={assets.locationIcon} alt="location-icon" />
                  <span>{room.hotel.address}</span>
                </div>
                <div className="flex flex-wrap items-center mt-3 mb-5 gap-2.5">
                  {room.amenities.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5 transition-all duration-300 hover:bg-slate-100 cursor-default"
                    >
                      <img
                        src={facilityIcons[item]}
                        alt={item}
                        className="w-4 h-4"
                      />
                      <p className="text-xs text-slate-600">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="text-lg font-semibold text-slate-900">
                  ${room.pricePerNight}{" "}
                  <span className="text-sm font-normal text-slate-400">
                    /night
                  </span>
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm w-72 max-lg:mb-8 min-lg:mt-16 shrink-0">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Filters
          </p>
          <div className="text-xs cursor-pointer">
            <span
              onClick={() => setOpenFilters(!openFilters)}
              className="lg:hidden text-slate-500 hover:text-slate-900 transition-colors font-medium"
            >
              {openFilters ? "HIDE" : "SHOW"}
            </span>
            <span
              className="hidden lg:block text-slate-500 hover:text-slate-900 transition-colors font-medium"
              onClick={clearFilters}
            >
              CLEAR
            </span>
          </div>
        </div>

        <div
          className={`${
            openFilters ? "h-auto" : "h-0 lg:h-auto"
          } overflow-hidden transition-all duration-700`}
        >
          <div className="pt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 pb-1">
              Room Type
            </p>
            {roomTypes.map((room, index) => (
              <CheckBox
                key={index}
                label={room}
                selected={selectedFilters.roomTypes.includes(room)}
                onChange={(checked) =>
                  handleFilterChanage(checked, room, "roomTypes")
                }
              />
            ))}
          </div>
          <div className="pt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 pb-1">
              Price Range
            </p>
            {priceRanges.map((range, index) => (
              <CheckBox
                key={index}
                label={`${currency} ${range}`}
                selected={selectedFilters.priceRanges.includes(range)}
                onChange={(checked) =>
                  handleFilterChanage(checked, range, "priceRanges")
                }
              />
            ))}
          </div>
          <div className="pt-6 pb-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 pb-1">
              Sort By
            </p>
            {sortOptions.map((option, index) => (
              <RadioButton
                key={index}
                label={option}
                selected={selectedSort === option}
                onChange={handleSortChange}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AllRooms;
