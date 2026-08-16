import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="bg-[#F6F9FC] text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-wrap justify-between gap-12 md:gap-6 opacity-80">
        <div className="max-w-80">
          <img src={assets.logo} alt="logo" className="mb-4 h-8 md:h-9 invert" />
          <p className="text-sm leading-relaxed">
            Discover the world's most extraordinary places to stay, from
            boutique hotels to luxury villas and private islands.
          </p>
          <div className="flex items-center gap-3 mt-4">
            {[assets.instagramIcon, assets.facebookIcon, assets.twitterIcon, assets.linkendinIcon].map((icon, i) => (
              <img
                key={i}
                src={icon}
                alt="social-icon"
                className="w-6 cursor-pointer transition-all duration-300 hover:scale-125 hover:opacity-80"
              />
            ))}
          </div>
        </div>

        <div>
          <p className="font-playfair text-lg text-gray-800">COMPANY</p>
          <ul className="mt-3 flex flex-col gap-2.5 text-sm">
            {["About", "Careers", "Press", "Blog", "Partners"].map((item) => (
              <li key={item}>
                <a href="#" className="transition-colors duration-300 hover:text-gray-800 hover:underline">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-playfair text-lg text-gray-800">SUPPORT</p>
          <ul className="mt-3 flex flex-col gap-2.5 text-sm">
            {["Help Center", "Safety Information", "Cancellation Options", "Contact Us", "Accessibility"].map((item) => (
              <li key={item}>
                <a href="#" className="transition-colors duration-300 hover:text-gray-800 hover:underline">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="max-w-80">
          <p className="font-playfair text-lg text-gray-800">STAY UPDATED</p>
          <p className="mt-3 text-sm leading-relaxed">
            Subscribe to our newsletter for inspiration and special offers.
          </p>
          <div className="flex items-center mt-4">
            <input
              type="text"
              className="bg-white rounded-l border border-gray-300 h-10 px-3 outline-none text-sm transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 w-full"
              placeholder="Your email"
            />
            <button className="flex items-center justify-center bg-black h-10 w-10 aspect-square rounded-r transition-all duration-300 hover:bg-gray-800 btn-press">
              <img
                src={assets.arrowIcon}
                alt="arrow-icon"
                className="w-3.5 invert"
              />
            </button>
          </div>
        </div>
      </div>
      <hr className="border-gray-300 mt-8" />
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-5">
        <p>© {new Date().getFullYear()} BookMyStay. All rights reserved.</p>
        <ul className="flex items-center gap-6">
          {["Privacy", "Terms", "Sitemap"].map((item) => (
            <li key={item}>
              <a href="#" className="text-sm transition-colors duration-300 hover:text-gray-800">{item}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
