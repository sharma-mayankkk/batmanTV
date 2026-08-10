import { useState } from "react";
import { useSelector } from "react-redux";

import {
    Heart,
    MessageCircle,
    Share2,
    MoreHorizontal,
    Pencil,
    Trash2,
} from "lucide-react";

import { timeAgo } from "../../utils/timeAgo";
import { toggleTweetLike } from "../../api/like";
import DropdownMenu from "../common/DropdownMenu";

function TweetCard({
    tweet,
    onEdit,
    onDelete,
}) {
    const user = useSelector(
        (state) => state.auth.user
    );

    const [liked, setLiked] = useState(false);

    const [likes, setLikes] = useState(
        tweet.likesCount || 0
    );

    const isOwner =
        user?._id === tweet.owner?._id;

    const handleLike = async () => {
        if (!user) return;

        try {
            const response =
                await toggleTweetLike(
                    tweet._id
                );

            setLiked(response.isLiked);

            setLikes((prev) =>
                response.isLiked
                    ? prev + 1
                    : Math.max(prev - 1, 0)
            );
        } catch (error) {
            console.error(
                "Failed to toggle tweet like:",
                error
            );
        }
    };

    return (
        <article
            className="
                group
                border-b
                border-zinc-800/60
                px-5
                py-5
                transition-colors
                duration-200
                hover:bg-white/1.5
            "
        >
            <div className="flex gap-3.5">

                {/* Avatar */}

                <div className="shrink-0">

                    <img
                        src={
                            tweet.owner?.avatar ||
                            "https://ui-avatars.com/api/?name=User&background=27272a&color=fff"
                        }
                        alt={
                            tweet.owner?.fullName ||
                            "User"
                        }
                        onError={(e) => {
                            e.currentTarget.src =
                                "https://ui-avatars.com/api/?name=User&background=27272a&color=fff";
                        }}
                        className="
                            h-10
                            w-10
                            rounded-full
                            object-cover
                            ring-1
                            ring-white/10
                        "
                    />

                </div>

                {/* Content */}

                <div className="min-w-0 flex-1">

                    {/* Header */}

                    <div className="flex items-start">

                        <div
                            className="
                                flex
                                min-w-0
                                items-center
                                gap-1.5
                            "
                        >
                            <span
                                className="
                                    max-w-45
                                    truncate
                                    text-[15px]
                                    font-semibold
                                    tracking-[-0.01em]
                                    text-white
                                "
                            >
                                {tweet.owner?.fullName}
                            </span>

                            <span
                                className="
                                    max-w-32.5
                                    truncate
                                    text-[14px]
                                    text-zinc-500
                                "
                            >
                                @{tweet.owner?.username}
                            </span>

                            <span className="text-zinc-700">
                                ·
                            </span>

                            <span
                                className="
                                    shrink-0
                                    text-[13px]
                                    text-zinc-500
                                "
                            >
                                {timeAgo(
                                    tweet.createdAt
                                )}
                            </span>
                        </div>

                        {/* Owner Menu */}

                        {isOwner && (
                            <div className="ml-auto shrink-0">

                                <DropdownMenu
                                    trigger={
                                        <div
                                            className="
                                                rounded-full
                                                p-1.5
                                                text-zinc-600
                                                transition
                                                duration-200
                                                hover:bg-zinc-800
                                                hover:text-zinc-300
                                            "
                                        >
                                            <MoreHorizontal
                                                size={18}
                                            />
                                        </div>
                                    }
                                    items={[
                                        {
                                            label: "Edit Tweet",
                                            icon: Pencil,
                                            onClick: () =>
                                                onEdit?.(
                                                    tweet
                                                ),
                                        },
                                        {
                                            label: "Delete Tweet",
                                            icon: Trash2,
                                            danger: true,
                                            onClick: () =>
                                                onDelete?.(
                                                    tweet
                                                ),
                                        },
                                    ]}
                                />

                            </div>
                        )}

                    </div>

                    {/* Tweet */}

                    <p
                        className="
                            mt-2
                            whitespace-pre-wrap
                            wrap-break-word
                            text-[15px]
                            leading-[1.65]
                            text-zinc-200
                        "
                    >
                        {tweet.content}
                    </p>

                    {/* Actions */}

                    <div
                        className="
                            mt-4
                            flex
                            max-w-105
                            items-center
                            justify-between
                        "
                    >

                        {/* Reply */}

                        <button
                            type="button"
                            className="
                                flex
                                items-center
                                gap-1.5
                                rounded-full
                                px-2
                                py-1.5
                                text-zinc-600
                                transition-all
                                duration-200
                                hover:bg-blue-500/10
                                hover:text-blue-400
                            "
                        >
                            <MessageCircle
                                size={18}
                                strokeWidth={1.8}
                            />

                            <span className="text-xs">
                                Reply
                            </span>
                        </button>

                        {/* Like */}

                        <button
                            type="button"
                            onClick={handleLike}
                            className={`
                                flex
                                items-center
                                gap-1.5
                                rounded-full
                                px-2
                                py-1.5
                                transition-all
                                duration-200
                                ${
                                    liked
                                        ? "text-red-500 hover:bg-red-500/10"
                                        : "text-zinc-600 hover:bg-red-500/10 hover:text-red-400"
                                }
                            `}
                        >
                            <Heart
                                size={18}
                                strokeWidth={1.8}
                                fill={
                                    liked
                                        ? "currentColor"
                                        : "none"
                                }
                            />

                            {likes > 0 && (
                                <span className="text-xs">
                                    {likes}
                                </span>
                            )}
                        </button>

                        {/* Share */}

                        <button
                            type="button"
                            className="
                                flex
                                items-center
                                gap-1.5
                                rounded-full
                                px-2
                                py-1.5
                                text-zinc-600
                                transition-all
                                duration-200
                                hover:bg-emerald-500/10
                                hover:text-emerald-400
                            "
                        >
                            <Share2
                                size={18}
                                strokeWidth={1.8}
                            />

                            <span className="text-xs">
                                Share
                            </span>
                        </button>

                    </div>

                </div>

            </div>
        </article>
    );
}

export default TweetCard;