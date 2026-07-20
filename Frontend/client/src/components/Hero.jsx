import heroImage from "../assets/heroImage.png";
import { assets, cities } from "../assets/assets";

const Hero = () => {
  return (
    <div
      className="flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 pt-28 h-screen bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <p className="bg-[#49B9FF]/50 px-3.5 py-1 rounded-full">
        The Ultimate Hotel Experience
      </p>

      <h1 className="font-playfair mt-4 max-w-2xl text-3xl font-bold leading-tight md:text-6xl md:leading-[70px] md:font-extrabold">
        Discover Your Perfect Getaway Destination
      </h1>

      <p className="mt-4 max-w-xl text-sm md:text-base">
        Unparalleled luxury and comfort await at the world's most exclusive
        hotels and resorts. Start your journey today.
      </p>

      <form className="mt-8 flex flex-col gap-4 rounded-xl bg-white px-6 py-4 mt-8 text-gray-600 shadow-lg md:flex-row md:items-end">
        {/* Destination */}
        <div>
          <div className="flex items-center gap-2">
            <img src={assets.locationIcon} alt="Location" className="h-4" />
            <label htmlFor="destinationInput">Destination</label>
          </div>

          <input
            list="destinations"
            id="destinationInput"
            type="text"
            placeholder="Type here"
            className="mt-2 rounded border border-gray-300 px-3 py-2 text-sm outline-none"
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
            className="mt-2 rounded border border-gray-300 px-3 py-2 text-sm outline-none"
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
            className="mt-2 rounded border border-gray-300 px-3 py-2 text-sm outline-none"
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
            placeholder="1"
            className="mt-2 w-20 rounded border border-gray-300 px-3 py-2 text-sm outline-none"
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800"
        >
          <img src={assets.searchIcon} alt="Search" className="h-5" />
          Search
        </button>
      </form>
    </div>
  );
};

export default Hero;
