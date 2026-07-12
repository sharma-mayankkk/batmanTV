import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getVideoById } from "../api/video";

import VideoPlayer from "../components/video/VideoPlayer";
import VideoInfo from "../components/video/VideoInfo";
import ChannelInfo from "../components/video/ChannelInfo";
import VideoActions from "../components/video/VideoActions";
import Description from "../components/video/Description";
import CommentSection from "../components/comments/CommentSection";
import RecommendedVideos from "../components/video/RecommendedVideos";

function Video() {
  const { videoId } = useParams();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const data = await getVideoById(videoId);
        setVideo(data);
      } catch (err) {
        console.log("Video API Error:", err);
        console.log("Response:", err.response);
        console.log("Response Data:", err.response?.data);

        setError("Failed to load video.");
      }
      finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-zinc-400">
        Loading video...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
      {/* Left */}
      <div className="space-y-6">
        <VideoPlayer video={video} />

        <VideoInfo video={video} />

        <VideoActions video={video} />

        <ChannelInfo video={video} />

        <Description video={video} />

        <CommentSection videoId={videoId} />
      </div>

      {/* Right */}
      <aside>
        <RecommendedVideos currentVideoId={videoId} />
      </aside>
    </div>
  );
}

export default Video;