import { NavLink } from "react-router-dom";
import {
  House,
  History,
  Heart,
  LayoutDashboard,
  ScrollText,
} from "lucide-react";

const navItems = [
  {
    name: "Home",
    path: "/",
    icon: House,
  },
  {
    name: "History",
    path: "/history",
    icon: History,
  },
  {
    name: "Liked Videos",
    path: "/liked-videos",
    icon: Heart,
  },
  {
    name: "Tweets",
    path: "/tweets",
    icon: ScrollText,
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
];

function Sidebar() {
  return (
    <aside className="w-64 h-[calc(100vh-64px)] overflow-y-auto bg-[#0f0f0f] px-3 py-3">

      <nav className="flex flex-col gap-1">

        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-6
                h-11
                px-4
                rounded-xl
                transition-all
                duration-200
                ${
                  isActive
                    ? "bg-[#272727] text-white font-medium"
                    : "text-zinc-300 hover:bg-[#272727] hover:text-white"
                }
                `
              }
            >
              <Icon size={23} strokeWidth={2.2} />

              <span className="text-[17px]">
                {item.name}
              </span>
            </NavLink>
          );
        })}

      </nav>
    </aside>
  );
}

export default Sidebar;