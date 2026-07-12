function CommentSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="flex gap-4">
          {/* Avatar */}
          <div className="h-11 w-11 rounded-full bg-zinc-800" />

          {/* Content */}
          <div className="flex-1">
            <div className="mb-3 h-4 w-40 rounded bg-zinc-800" />

            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-zinc-800" />
              <div className="h-3 w-4/5 rounded bg-zinc-800" />
            </div>

            <div className="mt-4 flex gap-6">
              <div className="h-4 w-12 rounded bg-zinc-800" />
              <div className="h-4 w-16 rounded bg-zinc-800" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentSkeleton;