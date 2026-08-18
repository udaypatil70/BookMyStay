import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="bg-slate-900 text-slate-400 px-6 md:px-16 lg:px-24 xl:px-32 pt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        <div className="max-w-80">
          <span className="font-playfair text-2xl font-bold tracking-tight text-white inline-block">
            BookMy<span className="text-secondary">Stay</span>
          </span>
          <p className="mt-4 text-sm leading-relaxed">
            Discover the world's most extraordinary places to stay, from
            boutique hotels to luxury villas and private islands.
          </p>
          <div className="flex items-center gap-3 mt-5">
            {[assets.instagramIcon, assets.facebookIcon, assets.twitterIcon, assets.linkendinIcon].map((icon, i) => (
              <img
                key={i}
                src={icon}
                alt="social-icon"
                className="w-5 opacity-60 cursor-pointer transition-all duration-300 hover:scale-110 hover:opacity-100"
              />
            ))}
          </div>
        </div>

        <div>
          <p className="font-playfair text-lg font-semibold text-slate-200">COMPANY</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            <li>
              <Link to="/rooms" className="transition-colors duration-300 hover:text-white">Hotels</Link>
            </li>
            <li><span className="cursor-default">Careers</span></li>
            <li><span className="cursor-default">Press</span></li>
            <li><span className="cursor-default">Blog</span></li>
            <li><span className="cursor-default">Partners</span></li>
          </ul>
        </div>

        <div>
          <p className="font-playfair text-lg font-semibold text-slate-200">SUPPORT</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            <li><span className="cursor-default">Help Center</span></li>
            <li><span className="cursor-default">Safety Information</span></li>
            <li><span className="cursor-default">Cancellation Options</span></li>
            <li>
              <Link to="/contact" className="transition-colors duration-300 hover:text-white">Contact Us</Link>
            </li>
            <li><span className="cursor-default">Accessibility</span></li>
          </ul>
        </div>

        <div className="max-w-80">
          <p className="font-playfair text-lg font-semibold text-slate-200">STAY UPDATED</p>
          <p className="mt-4 text-sm leading-relaxed">
            Subscribe to our newsletter for inspiration and special offers.
          </p>
          <div className="flex items-center mt-5">
            <input
              type="email"
              className="bg-slate-800 border border-slate-700 rounded-l-lg h-11 px-4 outline-none text-sm text-white placeholder:text-slate-500 transition-all duration-300 focus:border-secondary focus:ring-1 focus:ring-secondary/30 w-full"
              placeholder="Your email"
            />
            <button className="flex items-center justify-center bg-secondary h-11 w-11 rounded-r-lg transition-all duration-300 hover:bg-amber-600 btn-press shrink-0">
              <img
                src={assets.arrowIcon}
                alt="arrow-icon"
                className="w-3.5 invert"
              />
            </button>
          </div>
        </div>
      </div>

      <hr className="border-slate-800 mt-12" />

      <div className="flex flex-col md:flex-row items-center justify-between py-6">
        <p className="text-sm">
          © {new Date().getFullYear()} BookMyStay. All rights reserved.
        </p>
        <ul className="flex items-center gap-6 mt-3 md:mt-0">
          {["Privacy", "Terms", "Sitemap"].map((item) => (
            <li key={item}>
              <span className="text-sm cursor-default transition-colors duration-300 hover:text-white">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
