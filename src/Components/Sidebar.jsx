import React from "react";
import { SidebarData } from "./SidebarData";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="fixed top-0 left-0 h-screen w-60 bg-primary text-white inline-flex z-50">
      {/* z-50 ensures it stays above other content */}
      <ul className="w-full">
        {SidebarData.map((val, key) => {
          const isActive = location.pathname === val.link;

          return (
            <li
              key={key}
              className={`group w-full flex items-center gap-8 p-3 cursor-pointer 
                         border-b border-b-slate-100 transform transition-transform duration-200
                         ${isActive 
                            ? "bg-secondary border-l-4 border-white text-black" 
                            : "hover:bg-secondary hover:border-l-4 hover:border-white"}`}
            >
              <Link to={val.link} className="flex items-center gap-8 w-full">
                <div className="group-hover:scale-125">{val.icon}</div>
                <div className="group-hover:scale-125">{val.title}</div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}