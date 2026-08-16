import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 bg-gradient-to-b from-slate-50 to-white">
      <div className="text-center animate-fade-in-up">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <h1 className="text-[10rem] md:text-[14rem] font-bold leading-none gradient-text opacity-90">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-float">
              <svg
                className="w-24 h-24 md:w-32 md:h-32 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-playfair text-gray-800 mb-3">
          Oops! This room doesn't exist
        </h2>
        <p className="text-gray-500 max-w-md mx-auto mb-10 text-sm md:text-base">
          Looks like this page has checked out. Let us help you find your perfect stay
          instead.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="group flex items-center gap-2 bg-black text-white px-8 py-3.5 rounded-full font-medium transition-all duration-300 hover:bg-gray-800 hover:shadow-lg hover:shadow-black/20 btn-press"
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
            className="group flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-8 py-3.5 rounded-full font-medium transition-all duration-300 hover:border-gray-800 hover:text-black btn-press"
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

        {/* Decorative elements */}
        <div className="mt-16 flex items-center justify-center gap-2 text-gray-400">
          <div className="w-12 h-px bg-gray-300" />
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
          <div className="w-12 h-px bg-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
