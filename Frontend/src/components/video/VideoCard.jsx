// components/video/VideoCard.jsx

import { Link } from "react-router-dom";
import { formatViews } from "../../utils/formatViews";
import { timeAgo } from "../../utils/timeAgo";
import { formatDuration } from "../../utils/formatDuration";

function VideoCard({ video }) {
  const {
    _id,
    thumbnail,
    duration,
    title,
    channel,
    views,
    createdAt,
  } = video;

  return (
    <Link
      to={`/watch/${_id}`}
      className="
          group
          flex
          flex-col
          cursor-pointer will-change-transform
          rounded-2xl
          p-2
          -m-2
          transition-all
          duration-300
          hover:bg-neutral-900/70
          hover:-translate-y-1
          "
    >
      {/* Thumbnail */}
      <div
        className="
          relative
          aspect-video
          overflow-hidden
          rounded-xl
          bg-neutral-800
        "
      >
        <img
          loading="lazy"
          src={video.thumbnail}
          alt={video.title}
          onError={(e) => {
            e.target.src =
              "https://placehold.co/1280x720/18181b/ffffff?text=No+Thumbnail";
          }}
          draggable = {false}
          className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
              select-none
          "
        />

        <span
          className="
            absolute
            bottom-1.5
            right-1.5
            rounded-md
            bg-black/85 backdrop-blur-sm
            px-1
            py-0.5
            text-xs
            font-medium
            text-white
          "
        >
          {formatDuration(video.duration)}
        </span>
      </div>

      {/* Meta row */}
      <div className="flex gap-3 mt-3">
        <img
          loading="lazy"
          src={video.owner?.avatar}
          alt={channel?.name}
          onError={(e) => {
            e.target.src =
              "https://ui-avatars.com/api/?name=User&background=27272a&color=fff";
          }}
          className="
                h-10
                w-10
                rounded-full
                object-cover
                shrink-0
                ring-2
                ring-transparent
                transition-all
                duration-300
                group-hover:ring-zinc-600
                "
        />

        <div className="flex flex-col min-w-0">
          <h3
            className="
              line-clamp-2
              text-[16px]
              font-semibold
              leading-5
              text-white
            "
          >
            {title}
          </h3>

          <span className="mt-1 text-sm text-zinc-400 transition-colors group-hover:text-zinc-300">
            {video.owner?.username}
          </span>

          <span className="text-sm text-zinc-500">
            {formatViews(video.views)} views • {timeAgo(video.createdAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;