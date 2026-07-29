import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import { getPlaylistById } from "../api/playlist";
import {
    MoreVertical,
    Pencil,
    Trash2,
    ListVideo,
    Play,
    Share2,
} from "lucide-react";

import { timeAgo } from "../utils/timeAgo";
import { removeVideosFromPlaylist } from "../api/playlist";
import ConfirmModal from "../components/common/ConfirmModal";
import { useNavigate } from "react-router-dom";

import PlaylistModal from "../components/playlist/PlaylistModal";

import {
    updatePlaylist,
    deletePlaylist,
} from "../api/playlist";
import DropdownMenu from "../components/common/DropdownMenu";
import { Link } from "react-router-dom";

function PlaylistDetails() {

    const { playlistId } = useParams();

    const [playlist, setPlaylist] = useState(null);

    const [loading, setLoading] = useState(true);

    const [selectedVideo, setSelectedVideo] = useState(null);

    const [deleteVideoOpen, setDeleteVideoOpen] = useState(false);

    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);

    const [saving, setSaving] = useState(false);

    const [deletePlaylistOpen, setDeletePlaylistOpen] =
        useState(false);

    const fetchPlaylist = async () => {

        try {

            setLoading(true);

            const data = await getPlaylistById(playlistId);

            setPlaylist(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchPlaylist();

    }, [playlistId]);


    const handleRemoveVideo = async () => {

        if (!selectedVideo) return;

        try {

            await removeVideoFromPlaylist(
                playlist._id,
                selectedVideo._id
            );

            setPlaylist((prev) => ({
                ...prev,

                videos: prev.videos.filter(
                    (video) => video._id !== selectedVideo._id
                ),

                totalVideos: prev.totalVideos - 1,
            }));

        } catch (error) {

            console.error(error);

        } finally {

            setDeleteVideoOpen(false);

            setSelectedVideo(null);

        }

    };

    const handleUpdatePlaylist = async (formData) => {

        try {

            setSaving(true);

            await updatePlaylist(
                playlist._id,
                formData
            );

            await fetchPlaylist();

            setModalOpen(false);

        } catch (error) {

            console.error(error);

        } finally {

            setSaving(false);

        }

    };

    const handleDeletePlaylist = async () => {

        try {

            await deletePlaylist(playlist._id);

            navigate("/playlists");

        } catch (error) {

            console.error(error);

        } finally {

            setDeletePlaylistOpen(false);

        }

    };

    if (loading) {

        return (
            <div className="p-8 text-white">
                Loading...
            </div>
        );

    }

    return (
        <div className="mx-auto max-w-7xl px-6 py-8">

            <div className="flex flex-col gap-10 lg:flex-row">

                {/* ================= LEFT PANEL ================= */}

                <div
                    className="
                    lg:sticky
                    lg:top-24
                    h-fit
                    w-full
                    lg:w-95
                    shrink-0
                "
                >

                    {/* Thumbnail */}

                    <div className="overflow-hidden rounded-2xl">

                        <img
                            src={
                                playlist.thumbnail ||
                                "https://placehold.co/1280x720/18181b/ffffff?text=Playlist"
                            }
                            alt={playlist.name}
                            className="
                            aspect-video
                            w-full
                            object-cover
                        "
                        />

                    </div>

                    {/* ================= INFO ================= */}

                    <div className="mt-6">

                        <h1 className="text-3xl font-bold tracking-tight text-white">
                            {playlist.name}
                        </h1>

                        <div className="mt-4 flex flex-wrap gap-2">

                            <div className="rounded-full bg-[#1f1f1f] px-4 py-2 text-sm text-zinc-300">
                                🎬 {playlist.totalVideos} Videos
                            </div>

                            <div className="rounded-full bg-[#1f1f1f] px-4 py-2 text-sm text-zinc-300">
                                🕒 {timeAgo(playlist.updatedAt)}
                            </div>

                        </div>

                        {playlist.description && (
                            <p
                                className="
                                    mt-6
                                    whitespace-pre-line
                                    text-[15px]
                                    leading-7
                                    text-zinc-400
                                "
                            >
                                {playlist.description}
                            </p>
                        )}

                    </div>

                    {/* ================= ACTIONS ================= */}

                    <div className="mt-8 flex items-center gap-3">

                        <button
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-full
                                bg-white
                                px-6
                                py-3
                                font-medium
                                text-black
                                transition
                                hover:bg-zinc-200
                            "
                        >
                            <Play size={18} fill="black" />
                            Play All
                        </button>

                        <button
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-full
                                bg-[#272727]
                                text-white
                                px-5
                                h-12
                                font-medium
                                transition
                                hover:bg-[#3b3b3b]
                            "
                        >
                            <Share2 size={18} />
                            Share
                        </button>

                        <DropdownMenu
                            direction="up"
                            items={[
                                {
                                    label: "Edit Playlist",
                                    icon: Pencil,
                                    onClick: () => setModalOpen(true),
                                },
                                {
                                    label: "Delete Playlist",
                                    icon: Trash2,
                                    danger: true,
                                    onClick: () => setDeletePlaylistOpen(true),
                                },
                            ]}
                        />

                    </div>

                </div>

                {/* ================= RIGHT PANEL ================= */}

                <div className="flex-1">

                    <h2 className="mb-5 text-xl font-semibold text-white">

                        Playlist Videos

                    </h2>

                    <div className="space-y-3">

                        {playlist.videos?.length ? (

                            playlist.videos.map((video, index) => (

                                <Link
                                    key={video._id}
                                    to={`/watch/${video._id}`}
                                    className="
                                        group
                                        flex
                                        gap-4
                                        rounded-2xl
                                        p-3
                                        transition
                                        hover:bg-[#1a1a1a]
                                    "
                                >

                                    {/* Video Number */}

                                    <div
                                        className="
                                            flex
                                            w-8
                                            items-center
                                            justify-center
                                            text-lg
                                            font-medium
                                            text-zinc-500
                                        "
                                    >
                                        {index + 1}
                                    </div>

                                    {/* Thumbnail */}

                                    <div
                                        className="
                                            relative
                                            aspect-video
                                            w-72
                                            shrink-0
                                            overflow-hidden
                                            rounded-xl
                                        "
                                    >

                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="
                                                h-full
                                                w-full
                                                object-cover
                                            "
                                        />

                                        <span
                                            className="
                                                absolute
                                                bottom-2
                                                right-2
                                                rounded
                                                bg-black/80
                                                px-2
                                                py-0.5
                                                text-xs
                                                text-white
                                            "
                                        >
                                            {video.duration}
                                        </span>

                                    </div>

                                    {/* Info */}

                                    <div className="min-w-0 flex-1">

                                        <h3
                                            className="
                                                line-clamp-2
                                                text-lg
                                                font-medium
                                                text-white
                                            "
                                        >
                                            {video.title}
                                        </h3>

                                        <p className="mt-2 text-sm text-zinc-400">

                                            {video.views} views

                                        </p>

                                    </div>

                                    {/* Menu */}

                                    <div
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <DropdownMenu
                                            direction="up"
                                            items={[
                                                {
                                                    label: "Share",
                                                    icon: Share2,
                                                    onClick: () => {
                                                        console.log("share");
                                                    },
                                                },
                                                {
                                                    label: "Remove from Playlist",
                                                    icon: Trash2,
                                                    danger: true,
                                                    onClick: () => {
                                                        setSelectedVideo(video);
                                                        setDeleteVideoOpen(true);
                                                    },
                                                },
                                            ]}
                                        />
                                    </div>

                                </Link>

                            ))

                        ) : (

                            <div
                                className="
                                    flex
                                    h-72
                                    flex-col
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border
                                    border-dashed
                                    border-zinc-700
                                "
                            >

                                <ListVideo
                                    size={45}
                                    className="text-zinc-600"
                                />

                                <h2 className="mt-6 text-xl font-semibold text-white">

                                    No videos yet

                                </h2>

                                <p className="mt-2 text-zinc-500">

                                    Add videos to this playlist.

                                </p>

                            </div>

                        )}

                    </div>

                </div>

            </div>

            <ConfirmModal
                open={deleteVideoOpen}
                title="Remove Video"
                description={`Remove "${selectedVideo?.title}" from this playlist?`}
                onCancel={() => {

                    setDeleteVideoOpen(false);

                    setSelectedVideo(null);

                }}
                onConfirm={handleRemoveVideo}
            />

            <ConfirmModal
                open={deletePlaylistOpen}
                title="Delete Playlist"
                description={`Delete "${playlist?.name}"? This action cannot be undone.`}
                onCancel={() => setDeletePlaylistOpen(false)}
                onConfirm={handleDeletePlaylist}
            />


            <PlaylistModal
                open={modalOpen}
                mode="edit"
                initialData={playlist}
                loading={saving}
                onClose={() => setModalOpen(false)}
                onSubmit={handleUpdatePlaylist}
            />

        </div>
    );

}

export default PlaylistDetails;