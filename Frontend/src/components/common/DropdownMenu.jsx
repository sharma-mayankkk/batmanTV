import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";

function DropdownMenu({
    items = [],
    direction = "down",
}) {

    const [open, setOpen] = useState(false);

    const menuRef = useRef(null);

    useEffect(() => {

        const handleOutside = (e) => {

            if (
                menuRef.current &&
                !menuRef.current.contains(e.target)
            ) {

                setOpen(false);

            }

        };

        document.addEventListener(
            "mousedown",
            handleOutside
        );

        return () =>
            document.removeEventListener(
                "mousedown",
                handleOutside
            );

    }, []);

    return (

        <div
            ref={menuRef}
            className="relative"
        >

            <button
                onClick={() => setOpen((prev) => !prev)}
                className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    transition
                    hover:bg-[#272727]
                "
            >
                <MoreVertical size={20} />
            </button>

            {open && (

                <div
                    className={`
                        absolute
                        right-0
                        w-52
                        overflow-hidden
                        rounded-xl
                        border
                        border-zinc-700
                        bg-[#1a1a1a]
                        shadow-xl
                        z-50
                        ${
                            direction === "up"
                                ? "bottom-full mb-2"
                                : "top-full mt-2"
                        }
                    `}
                >

                    {items.map((item, index) => {

                        const Icon = item.icon;

                        return (

                            <button
                                key={index}
                                onClick={() => {

                                    setOpen(false);

                                    item.onClick();

                                }}
                                className={`
                                    flex
                                    w-full
                                    items-center
                                    gap-3
                                    px-4
                                    py-3
                                    transition
                                    ${
                                        item.danger
                                            ? "text-red-500 hover:bg-red-500/10"
                                            : "hover:bg-zinc-800"
                                    }
                                `}
                            >

                                <Icon size={18} />

                                {item.label}

                            </button>

                        );

                    })}

                </div>

            )}

        </div>

    );

}

export default DropdownMenu;