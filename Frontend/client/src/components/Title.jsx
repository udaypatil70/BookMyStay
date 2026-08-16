import React from "react";

const Title = ({ title, subtitle, subTitle, align, font }) => {
  const text = subtitle || subTitle;
  return (
    <div
      className={`flex flex-col justify-center items-center text-center animate-fade-in-up ${align === "left" ? "md:items-start md:text-left" : ""}`}
    >
      <h1 className={`text-4xl md:text-[40px] ${font || "font-playfair"} bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent`}>
        {title}
      </h1>
      {text && (
        <p className="text-sm md:text-base text-gray-500/90 mt-3 max-w-174 leading-relaxed">
          {text}
        </p>
      )}
    </div>
  );
};

export default Title;
