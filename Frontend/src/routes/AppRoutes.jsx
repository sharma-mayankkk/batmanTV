import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Video from "../pages/Video";
import Channel from "../pages/Channel";
import Dashboard from "../pages/Dashboard";
import Playlist from "../pages/Playlist";
import History from "../pages/History";
import Tweets from "../pages/Tweets";
import LikedVideos from "../pages/LikedVideos";
import NotFound from "../pages/NotFound";

import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";

function AppRoutes() {
    return (
        <Routes>

            {/* Main Application Layout */}
            <Route element={<MainLayout />}>

                <Route index element={<Home />} />

                <Route path="watch/:videoId" element={<Video />} />

                <Route path="channel/:username" element={<Channel />} />

                <Route path="dashboard" element={<Dashboard />} />

                <Route path="playlist/:playlistId" element={<Playlist />} />

                <Route path="history" element={<History />} />

                <Route path="tweets" element={<Tweets />} />

                <Route path="liked-videos" element={<LikedVideos />} />

            </Route>

            {/* Authentication Layout */}
            <Route element={<AuthLayout />}>

                <Route path="login" element={<Login />} />

                <Route path="register" element={<Register />} />

            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />

        </Routes>
    );
}

export default AppRoutes;