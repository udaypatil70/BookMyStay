
import { useNavigate } from "react-router-dom";
import Title from "./Title";
import { assets, exclusiveOffers } from "../assets/assets";

const ExclusiveOffers = () => {
  const navigate = useNavigate();

  return (
    <div className="py-24 px-6 md:px-16 lg:px-24">
      <div className="flex justify-between items-end">
        <Title
          align="left"
          title="Exclusive Offers"
          subtitle="Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories."
        />
        <button
          onClick={() => { navigate("/rooms"); scrollTo(0, 0); }}
          className="group hidden md:flex items-center gap-2 font-medium cursor-pointer whitespace-nowrap text-slate-900"
        >
          <span>View All Offers</span>
          <img
            src={assets.arrowIcon}
            alt="Arrow Icon"
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {exclusiveOffers.map((item) => (
          <div
            key={item._id}
            className="group relative rounded-2xl overflow-hidden relative h-72 text-white bg-no-repeat bg-cover bg-center hover-lift"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-500" />
            <p className="px-3 py-1 absolute top-4 left-4 text-xs bg-white text-slate-900 rounded-full font-semibold z-10">
              {item.priceOff}% OFF
            </p>
            <div className="relative z-10 h-full flex flex-col justify-end p-6">
              <div>
                <p className="text-2xl font-medium font-playfair">{item.title}</p>
                <p className="mt-1">{item.description}</p>
                <p className="text-xs text-white/70 mt-3">
                  Expires {item.expiryDate}
                </p>
              </div>
              <button
                onClick={() => { navigate("/rooms"); scrollTo(0, 0); }}
                className="flex items-center gap-2 font-medium cursor-pointer mt-4 group/btn"
              >
                View Offers
                <img
                  className="invert group-hover/btn:translate-x-1 transition-all duration-300"
                  src={assets.arrowIcon}
                  alt="Arrow-Icon"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExclusiveOffers;
