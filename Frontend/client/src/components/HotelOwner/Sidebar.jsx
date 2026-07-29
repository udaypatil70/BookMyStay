import React from "react";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const sidebarLinks = [
    {
      name: "Dashboard",
      path: "/owner",
      icon: assets.dashboardIcon,
    },
    {
      name: "Add Room",
      path: "/owner/add-room",
      icon: assets.addIcon,
    },
    {
      name: "List Room",
      path: "/owner/list-room",
      icon: assets.listIcon,
    },
  ];

  return (
    <div className="md:w-64 w-16 border-r border-slate-200/80 h-full bg-white shadow-sm pt-4 flex flex-col transition-all duration-300">
      <div className="px-4 md:px-6 mb-6 hidden md:block">
        <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
          Owner Menu
        </p>
      </div>
      {sidebarLinks.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          end={item.path === "/owner"}
          className={({ isActive }) =>
            `flex items-center py-3 px-4 md:px-6 gap-3 rounded-xl transition ${
              isActive
                ? "bg-slate-100 text-slate-900 shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`
          }
        >
          <img src={item.icon} alt={item.name} className="h-5 w-5" />
          <p className="md:block hidden text-sm font-medium">{item.name}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
