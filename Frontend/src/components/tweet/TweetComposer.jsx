import { useState } from "react";
import { useSelector } from "react-redux";
import { Send } from "lucide-react";

import { createTweet } from "../../api/tweet";

function TweetComposer({ onTweetCreated }) {
    const user = useSelector(
        (state) => state.auth.user
    );

    const [content, setContent] = useState("");
    const [posting, setPosting] = useState(false);

    const MAX_LENGTH = 280;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedContent = content.trim();

        if (!trimmedContent || posting) return;

        try {
            setPosting(true);

            const newTweet =
                await createTweet(
                    trimmedContent
                );

            setContent("");

            onTweetCreated?.(newTweet);
        } catch (error) {
            console.error(
                "Failed to create tweet:",
                error
            );
        } finally {
            setPosting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="
                border-b
                border-zinc-800/60
                px-5
                py-5
            "
        >
            <div className="flex gap-3.5">

                <img
                    src={
                        user?.avatar ||
                        "https://ui-avatars.com/api/?name=User&background=27272a&color=fff"
                    }
                    alt={
                        user?.fullName ||
                        "User"
                    }
                    className="
                        h-10
                        w-10
                        shrink-0
                        rounded-full
                        object-cover
                        ring-1
                        ring-white/10
                    "
                />

                <div className="min-w-0 flex-1">

                    <textarea
                        value={content}
                        onChange={(e) => {
                            if (
                                e.target.value
                                    .length <=
                                MAX_LENGTH
                            ) {
                                setContent(
                                    e.target.value
                                );
                            }
                        }}
                        placeholder="What's happening?"
                        rows={3}
                        className="
                            w-full
                            resize-none
                            bg-transparent
                            text-[16px]
                            leading-6
                            text-zinc-100
                            outline-none
                            placeholder:text-zinc-600
                        "
                    />

                    <div
                        className="
                            mt-3
                            flex
                            items-center
                            justify-between
                            border-t
                            border-zinc-800/60
                            pt-3
                        "
                    >
                        <span
                            className={
                                content.length > 250
                                    ? "text-xs text-red-400"
                                    : "text-xs text-zinc-600"
                            }
                        >
                            {content.length}/
                            {MAX_LENGTH}
                        </span>

                        <button
                            type="submit"
                            disabled={
                                !content.trim() ||
                                posting
                            }
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-full
                                bg-white
                                px-5
                                py-2
                                text-sm
                                font-semibold
                                text-black
                                shadow-sm
                                transition-all
                                duration-200
                                hover:bg-zinc-200
                                hover:shadow-md
                                active:scale-95
                                disabled:cursor-not-allowed
                                disabled:opacity-40
                            "
                        >
                            <Send size={15} />

                            {posting
                                ? "Posting..."
                                : "Post"}
                        </button>
                    </div>

                </div>
            </div>
        </form>
    );
}

export default TweetComposer;