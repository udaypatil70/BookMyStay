import heroImage from "../assets/heroImage.png";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div
      className="relative flex flex-col items-start justify-center h-screen bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />

      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 -mt-16">
        <h1 className="font-playfair max-w-2xl text-center text-3xl font-bold leading-tight md:text-6xl md:leading-[70px] md:font-extrabold animate-fade-in-up mb-8">
          Discover Your Perfect Getaway Destination
        </h1>
        <div className="w-full max-w-5xl animate-fade-in-up [animation-delay:0.15s]">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Hero;
