import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50">
      <div className="text-center animate-fade-in-up">
        <h1 className="text-[10rem] font-bold text-slate-200">
          404
        </h1>

        <h2 className="font-playfair text-3xl text-slate-900 mb-3">
          Oops! This room doesn't exist
        </h2>
        <p className="text-slate-500 max-w-md mx-auto mb-10 text-sm md:text-base">
          Looks like this page has checked out. Let us help you find your perfect stay
          instead.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="group flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-full font-medium transition-all duration-300 hover:bg-slate-800 hover:shadow-lg btn-press"
          >
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
          <Link
            to="/rooms"
            className="group flex items-center gap-2 border border-slate-300 text-slate-700 px-8 py-3.5 rounded-full font-medium transition-all duration-300 hover:border-slate-400 hover:text-slate-900 btn-press"
          >
            Explore Rooms
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>

        <div className="mt-16 flex items-center justify-center gap-2 text-slate-400">
          <div className="w-12 h-px bg-slate-300" />
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <div className="w-12 h-px bg-slate-300" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
