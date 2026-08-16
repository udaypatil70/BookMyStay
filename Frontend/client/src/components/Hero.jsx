import { useState } from "react";
import heroImage from "../assets/heroImage.png";
import { assets, cities } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Hero = () => {
  const { navigate, getToken, axios, setSearchedCities } = useAppContext();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const onSearch = async (e) => {
    e.preventDefault();

    // Build query params
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    if (guests) params.set("guests", guests);

    navigate(`/rooms?${params.toString()}`);

    // Call API to save recent searched city
    if (destination) {
      try {
        await axios.post(
          "/api/user/store-recent-search",
          { recentSearchedCity: destination },
          {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
            },
          },
        );

        // Add destination to searched cities (max 3 recent searches)
        setSearchedCities((prevSearchedCities) => {
          const updatedSearchedCities = [destination, ...prevSearchedCities];
          if (updatedSearchedCities.length > 3) {
            updatedSearchedCities.shift();
          }
          return updatedSearchedCities;
        });
      } catch (error) {
        // Silently fail - don't block search for save failure
      }
    }
  };

  return (
    <div
      className="flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 pt-28 h-screen bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="animate-fade-in-up">
        <p className="bg-[#49B9FF]/50 px-3.5 py-1 rounded-full inline-block backdrop-blur-sm">
          The Ultimate Hotel Experience
        </p>
      </div>

      <h1 className="font-playfair mt-4 max-w-2xl text-3xl font-bold leading-tight md:text-6xl md:leading-[70px] md:font-extrabold animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        Discover Your Perfect Getaway Destination
      </h1>

      <p className="mt-4 max-w-xl text-sm md:text-base animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        Unparalleled luxury and comfort await at the world's most exclusive
        hotels and resorts. Start your journey today.
      </p>

      <form
        onSubmit={onSearch}
        className="mt-8 flex flex-col gap-4 rounded-xl bg-white px-6 py-4 text-gray-600 shadow-lg md:flex-row md:items-end animate-slide-in-bottom"
        style={{ animationDelay: '0.3s' }}
      >
        {/* Destination */}
        <div>
          <div className="flex items-center gap-2">
            <img src={assets.locationIcon} alt="Location" className="h-4" />
            <label htmlFor="destinationInput">Destination</label>
          </div>

          <input
            onChange={(e) => setDestination(e.target.value)}
            value={destination}
            list="destinations"
            id="destinationInput"
            type="text"
            placeholder="Type here"
            className="mt-2 rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
            required
          />

          <datalist id="destinations">
            {cities.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>
        </div>

        {/* Check In */}
        <div>
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon} alt="Calendar" className="h-4" />
            <label htmlFor="checkIn">Check In</label>
          </div>

          <input
            id="checkIn"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="mt-2 rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
          />
        </div>

        {/* Check Out */}
        <div>
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon} alt="Calendar" className="h-4" />
            <label htmlFor="checkOut">Check Out</label>
          </div>

          <input
            id="checkOut"
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={checkIn || new Date().toISOString().split("T")[0]}
            disabled={!checkIn}
            className="mt-2 rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 disabled:opacity-50"
          />
        </div>

        {/* Guests */}
        <div>
          <label htmlFor="guests">Guests</label>

          <input
            id="guests"
            type="number"
            min="1"
            max="4"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            placeholder="1"
            className="mt-2 w-20 rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-black px-6 py-3 text-white transition-all duration-300 hover:bg-gray-800 hover:shadow-lg hover:shadow-black/20 btn-press"
        >
          <img src={assets.searchIcon} alt="Search" className="h-5" />
          Search
        </button>
      </form>
    </div>
  );
};

export default Hero;
