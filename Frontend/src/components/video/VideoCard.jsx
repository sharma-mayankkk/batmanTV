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
        cursor-pointer
        rounded-xl
        p-2
        -m-2
        transition-colors
        duration-200
        hover:bg-neutral-800/70
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
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover"
        />

        <span
          className="
            absolute
            bottom-1.5
            right-1.5
            rounded
            bg-black/80
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
          src={video.owner?.avatar}
          alt={channel?.name}
          className="
            h-9
            w-9
            rounded-full
            object-cover
            shrink-0
          "
        />

        <div className="flex flex-col min-w-0">
          <h3
            className="
              line-clamp-2
              text-[15px]
              font-medium
              leading-5
              text-white
            "
          >
            {title}
          </h3>

          <span className="mt-1 text-sm text-neutral-400">
            {video.owner?.username}
          </span>

          <span className="text-sm text-neutral-400">
            {formatViews(video.views)} views • {timeAgo(video.createdAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;