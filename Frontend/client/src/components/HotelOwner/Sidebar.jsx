import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const sidebarLinks = [
    {
      name: "Dashboard",
      path: "/owner",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      name: "Add Room",
      path: "/owner/add-room",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
    },
    {
      name: "List Room",
      path: "/owner/list-room",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 border-r border-slate-200/60 bg-gradient-to-b from-slate-50 to-white">
      <div className="px-6 py-5 border-b border-slate-200/60">
        <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-500 font-semibold">
          Navigation
        </p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {sidebarLinks.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            end={item.path === "/owner"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-100 ring-1 ring-emerald-100"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`transition-transform duration-200 ${isActive ? "scale-110 text-emerald-600" : "text-slate-400 group-hover:text-slate-600 group-hover:scale-105"}`}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mx-3 mb-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          <span className="text-xs font-medium text-slate-300">Need Help?</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Contact support for assistance with your listings.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
