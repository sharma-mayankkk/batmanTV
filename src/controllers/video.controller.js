import { apiError } from "../utils/apiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { Video } from '../models/video.model.js'
import { apiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import mongoose from "mongoose"

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body

    let videoFileLocalPath = req.files?.videoFile?.[0]?.path
    let thumbnailFileLocalPath = req.files?.thumbnail?.[0]?.path

    if (!title?.trim() || !description?.trim()) {
        throw new apiError(400, "Title and description are required")
    }

    if (!videoFileLocalPath) {
        throw new apiError(400, "Video file is required")
    }

    if (!thumbnailFileLocalPath) {
        throw new apiError(400, "Thumbnail file is required")
    }

    const video = await uploadOnCloudinary(videoFileLocalPath)
    const thumbnail = await uploadOnCloudinary(thumbnailFileLocalPath)

    if (!video) {
        throw new apiError(400, "Video file is required")
    }

    if (!thumbnail) {
        throw new apiError(400, "Thumbnail file is required")
    }

    const publishedVideo = await Video.create({
        videoFile: video.url,
        thumbnail: thumbnail.url,
        title,
        duration: video.duration,
        description,
        owner: req.user._id,
    })

    if (!publishedVideo) {
        throw new apiError(500, "Something went wrong while uploading video")
    }

    return res
        .status(201)
        .json(
            new apiResponse(
                201,
                publishedVideo,
                "Video Published successfully."
            )
        )
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    
    if(!mongoose.Types.ObjectId.isValid(videoId)){
        throw new apiError(400,"Invalid Video Id")
    }

    const video = await Video.findById(videoId)
    
    if(!video){
        throw new apiError(404,"Cannot Found Video")
    }

    return res
    .status(200)
    .json(
        new apiResponse(
            200,
            video,
            "Video Fetched Successfully"
        )
    )
})


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}