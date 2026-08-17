

const Title = ({ title, subtitle, subTitle, align, font }) => {
  const text = subtitle || subTitle;
  return (
    <div
      className={`flex flex-col justify-center items-center text-center animate-fade-in-up ${align === "left" ? "items-start text-left" : ""}`}
    >
      <h1 className={`text-3xl md:text-4xl ${font || "font-playfair"} text-slate-900`}>
        {title}
      </h1>
      {text && (
        <p className="text-sm md:text-base text-slate-500 mt-3 max-w-xl leading-relaxed">
          {text}
        </p>
      )}
    </div>
  );
};

export default Title;
