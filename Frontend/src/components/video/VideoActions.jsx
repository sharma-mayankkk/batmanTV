import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
} from "lucide-react";

function VideoActions() {
  const buttonClass = `
    flex
    items-center
    gap-2
    rounded-full
    border
    border-zinc-800
    bg-[#161616]
    px-5
    py-2.5
    text-sm
    font-medium
    text-zinc-200
    transition-all
    duration-200
    hover:bg-zinc-800
    hover:border-zinc-700
    hover:-translate-y-0.5
    active:scale-95
  `;

  return (
    <section className="flex flex-wrap gap-3">
      <button className={buttonClass}>
        <ThumbsUp size={18} />
        <span>Like</span>
      </button>

      <button className={buttonClass}>
        <ThumbsDown size={18} />
        <span>Dislike</span>
      </button>

      <button className={buttonClass}>
        <Share2 size={18} />
        <span>Share</span>
      </button>

      <button className={buttonClass}>
        <Bookmark size={18} />
        <span>Save</span>
      </button>
    </section>
  );
}

export default VideoActions;