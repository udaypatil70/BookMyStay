import heroImage from "../assets/heroImage.png";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div
      className="relative flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 pt-28 h-screen bg-cover bg-center bg-no-repeat text-white"
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

      <div className="absolute bottom-16 left-0 right-0 flex justify-center px-4 animate-slide-in-bottom" style={{ animationDelay: '0.3s' }}>
        <SearchBar />
      </div>
    </div>
  );
};

export default Hero;
