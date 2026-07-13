import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

function MainLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-black text-white">

            <Navbar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            <div className="pt-16 flex">
                <Sidebar isSidebarOpen={isSidebarOpen} />

                <main
                    className={`
                        flex-1
                        p-6
                        transition-all
                        duration-300
                        ${isSidebarOpen ? "ml-64" : "ml-20"}
                        `}
                >
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default MainLayout;