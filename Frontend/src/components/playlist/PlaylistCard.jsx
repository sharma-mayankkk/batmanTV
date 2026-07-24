import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";
import {
    Play,
    ListVideo,
    MoreVertical,
    Pencil,
    Trash2,
} from "lucide-react";

import DropdownMenu from "../common/DropdownMenu";

function PlaylistCard({
    playlist,
    onDelete,
    onEdit,
}) {

    return (
        <Link
            to={`/playlist/${playlist._id}`}
            className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-zinc-800
                bg-[#111111]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-zinc-700
                hover:bg-[#161616]
            "
        >

            <div className="absolute right-3 top-3 z-20">

                <DropdownMenu
                    direction="down"
                    items={[
                        {
                            label: "Edit Playlist",
                            icon: Pencil,
                            onClick: () => onEdit(playlist),
                        },
                        {
                            label: "Delete Playlist",
                            icon: Trash2,
                            danger: true,
                            onClick: () => onDelete(playlist),
                        },
                    ]}
                />

            </div>

            {/* Thumbnail */}

            <div
                className="
                    relative
                    aspect-video
                    overflow-hidden
                    bg-zinc-900
                "
            >

                <img
                    src={
                        playlist.thumbnail ||
                        "https://placehold.co/1280x720/18181b/ffffff?text=Playlist"
                    }
                    alt={playlist.name}
                    className="
                        h-full
    w-full
    object-cover
    transition-opacity
    duration-300
                    "
                />

                {/* Dark Overlay */}

                <div
                    className="
                        absolute
                        inset-0
                        bg-black/20
                        transition
                        group-hover:bg-black/35
                    "
                />

                {/* Play Icon */}

                <div
                    className="
                        absolute
                        inset-0
                        flex
                        items-center
                        justify-center
                        opacity-0
                        transition-all
                        duration-300
                        group-hover:opacity-100
                    "
                >
                    <div
                        className="
                            rounded-full
                            bg-black/70
                            p-4
                            backdrop-blur
                        "
                    >
                        <Play
                            size={28}
                            fill="white"
                            className="text-white"
                        />
                    </div>
                </div>

                {/* Video Count */}

                <div
                    className="
                        absolute
                        bottom-3
                        right-3
                        flex
                        items-center
                        gap-1
                        rounded-lg
                        bg-black/80
                        px-2
                        py-1
                        text-xs
                        text-white
                    "
                >
                    <ListVideo size={14} />

                    {playlist.totalVideos}
                </div>

            </div>

            {/* Details */}

            <div className="space-y-2 p-5">

                <h2
                    className="
                        line-clamp-1
                        text-lg
                        font-semibold
                        text-white
                    "
                >
                    {playlist.name}
                </h2>

                <p
                    className="
                        line-clamp-2
                        text-sm
                        text-zinc-400
                    "
                >
                    {playlist.description}
                </p>

                <div
                    className="
                        pt-2
                        text-sm
                        text-zinc-500
                    "
                >
                    {playlist.totalVideos} videos • Updated{" "}
                    {timeAgo(playlist.updatedAt)}
                </div>

            </div>

        </Link>
    );
}

export default PlaylistCard;