function ChannelInfo({ video }) {
  if (!video) return null;

  return (
    <section
      className="
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-zinc-800
        bg-[#111111]
        p-5
        transition-all
        duration-300
        hover:border-zinc-700
      "
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <img
          src={video.owner.avatar}
          alt={video.owner.fullName}
          className="
            h-14
            w-14
            rounded-full
            object-cover
            ring-2
            ring-zinc-800
          "
        />

        <div>
          <h3 className="text-lg font-semibold text-white">
            {video.owner.fullName}
          </h3>

          <p className="text-sm text-zinc-400">
            @{video.owner.username}
          </p>

          {/* Temporary until subscribers API */}
          <p className="mt-1 text-xs text-zinc-500">
            Subscribers coming soon
          </p>
        </div>
      </div>

      {/* Right */}
      <button
        className="
          rounded-full
          bg-white
          px-6
          py-2.5
          text-sm
          font-semibold
          text-black
          transition-all
          duration-200
          hover:scale-105
          hover:bg-zinc-200
          active:scale-95
        "
      >
        Subscribe
      </button>
    </section>
  );
}

export default ChannelInfo;