import { Search, Upload, Bell } from "lucide-react";
import logo from "../../assets/batlogo.png"; // Change path if needed

function Navbar() {
    return (
        <header className="sticky top-0 z-50 h-16 bg-[#0f0f0f] border-b border-zinc-800">

            <div className="grid grid-cols-[260px_1fr_220px] items-center h-full px-5">

                {/* LEFT */}

                <div className="flex items-center">

                    <img
                        src={logo}
                        alt="BatmanTV"
                        className="h-10 object-contain cursor-pointer"
                    />

                </div>

                {/* CENTER */}

                <div className="flex justify-center">

                    <div className="flex w-full max-w-175">

                        <input
                            type="text"
                            placeholder="Search"
                            className="
                                flex-1
                                h-10
                                bg-[#121212]
                                border
                                border-zinc-700
                                rounded-l-full
                                pl-7
                                pr-4
                                text-white
                                placeholder:text-zinc-500
                                outline-none
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
                                hover:bg-[#303030]
                                transition
                            "
                        >
                            <Search size={22} />
                        </button>

                    </div>

                </div>

                {/* RIGHT */}

                <div className="flex justify-end items-center gap-3">

                    <button
                        className="
                            w-10
                            h-10
                            rounded-full
                            flex
                            items-center
                            justify-center
                            hover:bg-[#272727]
                            transition
                        "
                    >
                        <Upload size={22} />
                    </button>

                    <button
                        className="
                            w-10
                            h-10
                            rounded-full
                            flex
                            items-center
                            justify-center
                            hover:bg-[#272727]
                            transition
                        "
                    >
                        <Bell size={22} />
                    </button>

                    <img
                        src="https://i.pravatar.cc/100"
                        alt=""
                        className="w-8 h-8 rounded-full object-cover cursor-pointer"
                    />

                </div>

            </div>

        </header>
    );
}

export default Navbar;