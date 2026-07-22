import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MoreVertical } from "lucide-react";

import { formatViews } from "../../utils/formatViews";
import { timeAgo } from "../../utils/timeAgo";

import HistoryMenu from "./HistoryMenu";

function HistoryVideoCard({ video }) {
    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);

    return (
        <article
            className="
                group
                relative
                flex
                gap-4
                rounded-xl
                p-2
                transition
                hover:bg-zinc-900
            "
        >
            {/* Thumbnail */}

            <div
                onClick={() => navigate(`/watch/${video._id}`)}
                className="
                    relative
                    w-70
                    shrink-0
                    cursor-pointer
                    overflow-hidden
                    rounded-xl
                    aspect-video
                    bg-zinc-800
                "
            >
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Right Side */}

            <div className="flex flex-1 justify-between">

                {/* Content */}

                <div
                    className="min-w-0 cursor-pointer"
                    onClick={() => navigate(`/watch/${video._id}`)}
                >
                    <h3 className="text-lg font-semibold leading-6 text-white line-clamp-2">
                        {video.title}
                    </h3>

                    <div className="mt-3 flex items-center gap-3">

                        <img
                            src={video.owner.avatar}
                            alt={video.owner.fullName}
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/channel/${video.owner.username}`);
                            }}
                            className="
                                h-8
                                w-8
                                cursor-pointer
                                rounded-full
                                object-cover
                            "
                        />

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/channel/${video.owner.username}`);
                            }}
                            className="
                                text-sm
                                text-zinc-300
                                transition
                                hover:text-white
                            "
                        >
                            {video.owner.fullName}
                        </button>

                    </div>

                    <p className="mt-2 text-sm text-zinc-500">
                        {formatViews(video.views)} views • {timeAgo(video.createdAt)}
                    </p>

                    <p
                        className="
                            mt-3
                            line-clamp-2
                            text-sm
                            leading-6
                            text-zinc-400
                        "
                    >
                        {video.description}
                    </p>

                </div>

                {/* Menu */}

                <div className="relative shrink-0">

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowMenu((prev) => !prev);
                        }}
                        className="
                            rounded-full
                            p-2
                            text-zinc-400
                            transition
                            hover:bg-zinc-800
                            hover:text-white
                        "
                    >
                        <MoreVertical size={20} />
                    </button>

                    {showMenu && (
                        <HistoryMenu
                            onClose={() => setShowMenu(false)}
                            video={video}
                        />
                    )}

                </div>

            </div>

        </article>
    );
}

export default HistoryVideoCard;