import { NavLink } from "react-router-dom";

const navItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "History",
    path: "/history",
  },
  {
    name: "Liked Videos",
    path: "/liked-videos",
  },
  {
    name: "Tweets",
    path: "/tweets",
  },
  {
    name: "Dashboard",
    path: "/dashboard",
  },
];

function Sidebar() {
  return (
    <aside className="w-64 border-r border-zinc-800 min-h-[calc(100vh-64px)] p-4">

      <nav className="flex flex-col gap-2">

        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `rounded-lg px-4 py-3 transition-colors ${isActive
                ? "bg-white text-black font-semibold"
                : "text-white hover:bg-zinc-800"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}

      </nav>

    </aside>
  );
}

export default Sidebar;