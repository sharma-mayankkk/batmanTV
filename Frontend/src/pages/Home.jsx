// pages/Home.jsx

import { useEffect, useState } from "react";
import VideoGrid from "../components/video/VideoGrid";
import api from "../api/axios";

function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await api.get("/videos");

        console.log(response.data.data.docs);
        setVideos(response.data.data.docs);

      } catch (error) {
        console.error("Failed to fetch videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 pt-6 pb-8">
      {loading ? (
        <div className="w-full h-64 flex items-center justify-center text-gray-500">
          Loading videos...
        </div>
      ) : (
        <VideoGrid videos={videos} />
      )}
    </div>
  );
}

export default Home;