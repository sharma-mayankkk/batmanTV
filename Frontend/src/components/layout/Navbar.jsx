import { Search, Upload, Bell, Menu } from "lucide-react";
import logo from "../../assets/batlogo.png"; // Change path if needed
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../store/slices/authSlice";
import { logoutUser } from "../../api/auth";

function Navbar({
    isSidebarOpen,
    setIsSidebarOpen,
}) {
    const { user, isAuthenticated } = useSelector(
        (state) => state.auth
    );

    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const iconButtonClass = `
                        w-10
                        h-10
                        rounded-full
                        flex
                        items-center
                        justify-center
                        transition-all
                        duration-200
                        hover:bg-[#272727]
                        hover:scale-105
                        active:scale-95
                        `;

    const menuItemClass = `
                        w-full
                        px-4
                        py-3
                        text-left
                        transition-all
                        duration-200
                        hover:bg-zinc-800
                `;

    const handleLogout = async () => {
        try {
            await logoutUser();

            dispatch(logout());

            setShowMenu(false);

            navigate("/", { replace: true });
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setShowMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);


    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0f0f0f] border-b border-zinc-800">

            <div className="grid grid-cols-[260px_1fr_220px] items-center h-full px-5">

                {/* LEFT */}

                <div className="flex items-center gap-3">

                    <button
                        onClick={() => setIsSidebarOpen((prev) => !prev)}
                        className="
                            w-10
                            h-10
                            rounded-full
                            flex
                            items-center
                            justify-center
                            transition-all
                            duration-200
                            hover:bg-[#272727]
                            hover:scale-105
                            active:scale-95
                        "
                    >
                        <Menu size={22} />
                    </button>

                    <Link to="/">
                        <img
                            src={logo}
                            alt="BatmanTV"
                            className="
                                h-10
                                object-contain
                                cursor-pointer
                                select-none
                                transition-all
                                duration-300
                                hover:scale-105
                                hover:opacity-90
                                active:scale-95
                            "
                        />
                    </Link>

                </div>

                {/* CENTER */}

                <div className="flex justify-center">

                    <div className="flex w-full max-w-175">

                        <input
                            type="text"
                            placeholder="Search"
                            className="
                                peer
                                flex-1
                                h-10
                                bg-[#121212]
                                border
                                border-zinc-700
                                rounded-l-full
                                pl-6
                                pr-4
                                text-[15px]
                                text-white
                                placeholder:text-zinc-500
                                outline-none
                                transition-all
                                duration-200
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-500/20
                            "
                        />

                        <button
                            className="
                                w-16
                                h-10
                                bg-[#222222]
                                border
                                border-zinc-700
                                border-l-0
                                rounded-r-full
                                flex
                                items-center
                                justify-center
                                transition-all
                                duration-200
                                hover:bg-[#303030]
                                peer-focus:border-blue-500
                                peer-focus:text-blue-400
                                active:scale-95
                            "
                        >
                            <Search size={22} />
                        </button>

                    </div>

                </div>

                {/* RIGHT */}

                <div className="flex justify-end items-center gap-3">
                    <button
                        onClick={() => navigate("/upload")}
                        className={iconButtonClass}
                    >
                        <Upload size={22} />
                    </button>

                    <button className={iconButtonClass}>
                        <Bell size={22} />
                    </button>

                    {isAuthenticated ? (
                        <div className="relative" ref={menuRef}>

                            <img
                                src={user.avatar}
                                alt={user.fullName}
                                onClick={() => setShowMenu((prev) => !prev)}
                                className="
                                    w-9
                                    h-9
                                    rounded-full
                                    object-cover
                                    cursor-pointer
                                    transition-all
                                    duration-200
                                    hover:scale-105
                                    hover:ring-2
                                    hover:ring-zinc-400
                                    ring-offset-2
                                    ring-offset-[#0f0f0f]
                                    active:scale-95
                                    select-none
                                "
                            />

                            {showMenu && (
                                <div
                                    className="
                                        absolute
                                        right-0
                                        mt-3
                                        w-72
                                        overflow-hidden
                                        rounded-xl
                                        border
                                        border-zinc-800
                                        bg-[#212121]
                                        shadow-[0_12px_40px_rgba(0,0,0,0.45)]
                                        transition-all
                                        duration-200
                                    "
                                >

                                    <div className="flex items-center gap-3 p-4 border-b border-zinc-800">

                                        <img
                                            src={user.avatar}
                                            alt={user.fullName}
                                            className="w-11 h-11 rounded-full object-cover"
                                        />

                                        <div className="min-w-0">
                                            <h3 className="text-[15px] font-semibold text-white">
                                                {user.fullName}
                                            </h3>

                                            <p className="text-[13px] text-zinc-400 truncate">
                                                {user.email}
                                            </p>
                                        </div>

                                    </div>

                                    <Link to="/profile">

                                        <button className={`${menuItemClass} text-white`}>
                                            My Profile
                                        </button>

                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className={`${menuItemClass} text-red-400`}
                                    >
                                        Logout
                                    </button>

                                </div>
                            )}

                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="
                                px-5
                                h-10
                                rounded-full
                                border
                                border-blue-500
                                text-blue-500
                                flex
                                items-center
                                justify-center
                                font-medium
                                transition-all
                                duration-200
                                hover:bg-blue-500/10
                                hover:scale-105
                                active:scale-95
                            "
                        >
                            Sign In
                        </Link>
                    )}

                </div>

            </div>

        </header>
    );
}

export default Navbar;