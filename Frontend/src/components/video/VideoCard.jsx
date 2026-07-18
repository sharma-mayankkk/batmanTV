// components/video/VideoCard.jsx

import { Link, useNavigate } from "react-router-dom";
import { formatViews } from "../../utils/formatViews";
import { timeAgo } from "../../utils/timeAgo";
import { formatDuration } from "../../utils/formatDuration";

function VideoCard({ video, variant = "grid" }) {
  const isCompact = variant === "compact";

  const {
    _id,
    thumbnail,
    duration,
    title,
    channel,
    views,
    createdAt,
  } = video;
  const navigate = useNavigate();

  return (
    <Link
      to={`/watch/${_id}`}
      className={
        isCompact
          ? `
            group
            flex
            gap-3
            rounded-xl
            p-2
            transition-all
            duration-300
            hover:bg-zinc-900
          `
          : `
            group
            flex
            flex-col
            cursor-pointer
            will-change-transform
            rounded-2xl
            p-2
            -m-2
            transition-all
            duration-300
            hover:bg-neutral-900/70
            hover:-translate-y-1
          `
      }
    >
      {/* Thumbnail */}
      <div
        className={
          isCompact
            ? `
              relative
              w-44
              aspect-video
              shrink-0
              overflow-hidden
              rounded-xl
              bg-neutral-800
            `
            : `
              relative
              aspect-video
              overflow-hidden
              rounded-xl
              bg-neutral-800
            `
        }
      >
        <img
          loading="lazy"
          src={thumbnail}
          alt={title}
          draggable={false}
          onError={(e) => {
            e.target.src =
              "https://placehold.co/1280x720/18181b/ffffff?text=No+Thumbnail";
          }}
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
              bg-black/85
              backdrop-blur-sm
              px-1
              py-0.5
              text-xs
              font-medium
              text-white
            "
        >
          {formatDuration(duration)}
        </span>
      </div>

      {/* Grid Layout */}
      {!isCompact && (
        <div className="mt-3 flex gap-3">
          {/* Avatar */}
          <img
            loading="lazy"
            src={video.owner?.avatar}
            alt={video.owner?.fullName}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate(`/channel/${video.owner?.username}`);
            }}
            onError={(e) => {
              e.target.src =
                "https://ui-avatars.com/api/?name=User&background=27272a&color=fff";
            }}
            className="
                h-10
                w-10
                shrink-0
                cursor-pointer
                rounded-full
                object-cover
                ring-2
                ring-transparent
                transition-all
                duration-300
                hover:scale-105
              hover:ring-red-600
              "
          />

          <div className="flex min-w-0 flex-col">
            {/* Title */}
            <h3 className="line-clamp-2 text-[16px] font-semibold leading-5 text-white">
              {title}
            </h3>

            {/* Channel */}
            <p
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(`/channel/${video.owner?.username}`);
              }}
              className="
          mt-1
          w-fit
          cursor-pointer
          text-sm
          text-zinc-400
          transition
          hover:text-white
        "
            >
              {video.owner?.username}
            </p>

            {/* Stats */}
            <span className="text-sm text-zinc-500">
              {formatViews(views)} views • {timeAgo(createdAt)}
            </span>
          </div>
        </div>
      )}

      {/* Compact Layout */}
      {isCompact && (
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-[15px] font-semibold leading-5 text-white">
            {title}
          </h3>

          <p
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate(`/channel/${video.owner?.username}`);
            }}
            className="
        mt-2
        w-fit
        cursor-pointer
        text-sm
        text-zinc-400
        transition
        hover:text-white
      "
          >
            {video.owner?.username}
          </p>

          <p className="text-sm text-zinc-500">
            {formatViews(views)} views
          </p>

          <p className="text-sm text-zinc-500">
            {timeAgo(createdAt)}
          </p>
        </div>
      )}
    </Link>
  );
}

export default VideoCard;