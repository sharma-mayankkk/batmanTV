import { NavLink } from "react-router-dom";
import {
  House,
  History,
  Heart,
  LayoutDashboard,
  Bird,
  ListVideo
} from "lucide-react";

const navItems = [
  {
    name: "Home",
    path: "/",
    icon: House,
  },
  {
    name: "Liked Videos",
    path: "/liked-videos",
    icon: Heart,
  },
  {
    name: "Playlists",
    path: "/playlists",
    icon: ListVideo,
  },
  {
    name: "Tweets",
    path: "/tweets",
    icon: Bird,
  },
  {
    name: "History",
    path: "/history",
    icon: History,
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
];

function Sidebar({ isSidebarOpen }) {
  return (
<aside
  className={`
    fixed
    left-0
    top-16
    h-[calc(100vh-64px)]
    overflow-y-auto
    overflow-x-visible
    bg-[#0f0f0f]
    py-4
    scrollbar-hide
    transition-all
    duration-300
    z-30
    ${isSidebarOpen ? "w-64 px-3" : "w-20 px-2"}
  `}
>

      <nav className="flex flex-col gap-1">

        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
            >
              {({ isActive }) => (
                <div
                  className={`
                    group
                    relative
                    flex
                    items-center
                    ${isSidebarOpen ? "gap-5" : "justify-center"}
                    h-11
                    px-4
                    rounded-xl
                    cursor-pointer
                    select-none
                    transition-all
                    duration-200
                    ease-out
                    ${isActive
                      ? "bg-[#272727] text-white font-semibold translate-x-1"
                      : "text-zinc-300 hover:bg-[#272727] hover:text-white hover:translate-x-1"
                    }
                  `}
                >
                  {isActive && (
                    <span className="absolute left-0 h-6 w-1 rounded-r-full bg-white" />
                  )}

                  <Icon
                    size={22}
                    strokeWidth={2.2}
                    className={`
                      transition-transform
                      duration-200
                      ${isActive
                        ? "scale-110"
                        : "group-hover:scale-105"
                      }
                    `}
                  />

                  {!isSidebarOpen && (
                    <div
                      className="
                          absolute
                          left-16
                          z-50
                          pointer-events-none
                          rounded-md
                          bg-[#272727]
                          px-3
                          py-2
                          text-sm
                          text-white
                          opacity-0
                          shadow-lg
                          transition-all
                          duration-200
                          group-hover:translate-x-1
                          group-hover:opacity-100
                          whitespace-nowrap
                        "
                    >
                      {item.name}
                    </div>
                  )}

                  {isSidebarOpen && (
                    <span className="text-[15px] tracking-wide whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </div>
              )}
            </NavLink>
          );
        })}

      </nav>

    </aside>
  );
}

export default Sidebar;