import React from "react";

const Title = ({ title, subtitle, subTitle, align, font }) => {
  const text = subtitle || subTitle;
  return (
    <div
      className={`flex flex-col justify-center items-center text-center ${align === "left" ? "md:items-start md:text-left" : ""}`}
    >
      <h1 className={`text-4xl md:text-[40px] ${font || "font-playfair"}`}>
        {title}
      </h1>
      {text && (
        <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174">
          {text}
        </p>
      )}
    </div>
  );
};

export default Title;
