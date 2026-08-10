import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Heart } from "lucide-react";

import {
    getAllTweets,
    createTweet,
    updateTweet,
    deleteTweet,
} from "../api/tweet";

import TweetCard from "../components/tweet/TweetCard";
import TweetModal from "../components/tweet/TweetModal";
import ConfirmModal from "../components/common/ConfirmModal";

function Tweets() {
    const user = useSelector(
        (state) => state.auth.user
    );

    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [posting, setPosting] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingTweet, setEditingTweet] = useState(null);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedTweet, setSelectedTweet] = useState(null);

    const [content, setContent] = useState("");

    /* ================= FETCH ================= */

    const fetchTweets = async () => {
        try {
            setLoading(true);

            const data = await getAllTweets(1, 10);

            setTweets(data.docs || []);
        } catch (error) {
            console.error(
                "Failed to fetch tweets:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTweets();
    }, []);

    /* ================= CREATE ================= */

    const handleCreateTweet = async (e) => {
        e.preventDefault();

        if (!content.trim()) return;

        try {
            setPosting(true);

            const newTweet = await createTweet(
                content.trim()
            );

            setTweets((prev) => [
                newTweet,
                ...prev,
            ]);

            setContent("");
        } catch (error) {
            console.error(
                "Failed to create tweet:",
                error
            );
        } finally {
            setPosting(false);
        }
    };

    /* ================= EDIT ================= */

    const handleEdit = (tweet) => {
        setEditingTweet(tweet);
        setModalOpen(true);
    };

    const handleUpdateTweet = async (
        updatedContent
    ) => {
        if (!editingTweet) return;

        try {
            setPosting(true);

            const updatedTweet =
                await updateTweet(
                    editingTweet._id,
                    updatedContent
                );

            setTweets((prev) =>
                prev.map((tweet) =>
                    tweet._id === editingTweet._id
                        ? {
                              ...tweet,
                              content:
                                  updatedTweet.content,
                              updatedAt:
                                  updatedTweet.updatedAt,
                          }
                        : tweet
                )
            );

            setModalOpen(false);
            setEditingTweet(null);
        } catch (error) {
            console.error(
                "Failed to update tweet:",
                error
            );
        } finally {
            setPosting(false);
        }
    };

    /* ================= DELETE ================= */

    const handleDeleteClick = (tweet) => {
        setSelectedTweet(tweet);
        setDeleteOpen(true);
    };

    const handleDeleteTweet = async () => {
        if (!selectedTweet) return;

        try {
            await deleteTweet(
                selectedTweet._id
            );

            setTweets((prev) =>
                prev.filter(
                    (tweet) =>
                        tweet._id !==
                        selectedTweet._id
                )
            );
        } catch (error) {
            console.error(
                "Failed to delete tweet:",
                error
            );
        } finally {
            setDeleteOpen(false);
            setSelectedTweet(null);
        }
    };

    return (
        <div className="min-h-screen w-full">

            {/* Feed Container */}

            <div
                className="
                    mx-auto
                    min-h-screen
                    w-full
                    max-w-2xl
                    border-x
                    border-zinc-800/60
                    bg-[#0f0f0f]
                "
            >

                {/* ================= HEADER ================= */}

                <div
                    className="
                        sticky
                        top-0
                        z-30
                        border-b
                        border-zinc-800/70
                        bg-[#0f0f0f]/85
                        px-5
                        py-4
                        backdrop-blur-xl
                    "
                >
                    <div className="flex items-center gap-3">

                        <div
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                bg-red-500/10
                                ring-1
                                ring-red-500/10
                            "
                        >
                            <Heart
                                size={18}
                                className="text-red-500"
                                fill="currentColor"
                            />
                        </div>

                        <div>
                            <h1
                                className="
                                    text-[17px]
                                    font-semibold
                                    tracking-tight
                                    text-white
                                "
                            >
                                Tweets
                            </h1>

                            <p
                                className="
                                    mt-0.5
                                    text-xs
                                    text-zinc-500
                                "
                            >
                                What's happening
                            </p>
                        </div>

                    </div>
                </div>

                {/* ================= CREATE ================= */}

                {user && (
                    <form
                        onSubmit={handleCreateTweet}
                        className="
                            border-b
                            border-zinc-800/70
                            px-5
                            py-5
                        "
                    >
                        <div className="flex gap-3">

                            <img
                                src={
                                    user.avatar ||
                                    "https://ui-avatars.com/api/?name=User&background=27272a&color=fff"
                                }
                                alt={
                                    user.fullName ||
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
                                    onChange={(e) =>
                                        setContent(
                                            e.target.value
                                        )
                                    }
                                    maxLength={500}
                                    rows={3}
                                    placeholder="What's happening?"
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
                                        border-zinc-800/70
                                        pt-3
                                    "
                                >
                                    <span
                                        className="
                                            text-xs
                                            text-zinc-600
                                        "
                                    >
                                        {content.length}/500
                                    </span>

                                    <button
                                        type="submit"
                                        disabled={
                                            posting ||
                                            !content.trim()
                                        }
                                        className="
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
                                        {posting
                                            ? "Posting..."
                                            : "Post"}
                                    </button>
                                </div>

                            </div>
                        </div>
                    </form>
                )}

                {/* ================= FEED ================= */}

                {loading ? (

                    <div className="divide-y divide-zinc-800/60">

                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="
                                    flex
                                    gap-3
                                    px-5
                                    py-5
                                "
                            >
                                <div
                                    className="
                                        h-10
                                        w-10
                                        shrink-0
                                        animate-pulse
                                        rounded-full
                                        bg-zinc-800
                                    "
                                />

                                <div
                                    className="
                                        flex
                                        flex-1
                                        flex-col
                                        gap-3
                                    "
                                >
                                    <div className="h-4 w-48 animate-pulse rounded-md bg-zinc-800" />

                                    <div className="h-4 w-full animate-pulse rounded-md bg-zinc-800" />

                                    <div className="h-4 w-2/3 animate-pulse rounded-md bg-zinc-800" />
                                </div>
                            </div>
                        ))}

                    </div>

                ) : tweets.length === 0 ? (

                    <div
                        className="
                            flex
                            min-h-[55vh]
                            flex-col
                            items-center
                            justify-center
                            px-6
                            text-center
                        "
                    >
                        <div
                            className="
                                flex
                                h-16
                                w-16
                                items-center
                                justify-center
                                rounded-full
                                bg-zinc-900
                                ring-1
                                ring-zinc-800
                            "
                        >
                            <Heart
                                size={28}
                                className="text-zinc-600"
                            />
                        </div>

                        <h2
                            className="
                                mt-5
                                text-lg
                                font-semibold
                                text-white
                            "
                        >
                            No tweets yet
                        </h2>

                        <p
                            className="
                                mt-2
                                max-w-xs
                                text-sm
                                leading-6
                                text-zinc-500
                            "
                        >
                            Be the first one to
                            share something.
                        </p>
                    </div>

                ) : (

                    <div>
                        {tweets.map((tweet) => (
                            <TweetCard
                                key={tweet._id}
                                tweet={tweet}
                                onEdit={handleEdit}
                                onDelete={
                                    handleDeleteClick
                                }
                            />
                        ))}
                    </div>
                )}

                {/* ================= EDIT MODAL ================= */}

                <TweetModal
                    open={modalOpen}
                    mode="edit"
                    initialContent={
                        editingTweet?.content || ""
                    }
                    loading={posting}
                    onClose={() => {
                        if (posting) return;

                        setModalOpen(false);
                        setEditingTweet(null);
                    }}
                    onSubmit={handleUpdateTweet}
                />

                {/* ================= DELETE MODAL ================= */}

                <ConfirmModal
                    open={deleteOpen}
                    title="Delete Tweet"
                    description={
                        `Delete "${selectedTweet?.content}"? This action cannot be undone.`
                    }
                    onCancel={() => {
                        setDeleteOpen(false);
                        setSelectedTweet(null);
                    }}
                    onConfirm={handleDeleteTweet}
                />

            </div>
        </div>
    );
}

export default Tweets;