import { apiError } from "../utils/apiError.js"
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js"
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
        videoFilePublicId: video.public_id,
        thumbnail: thumbnail.url,
        thumbnailPublicId: thumbnail.public_id,
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

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new apiError(400, "Invalid Video Id")
    }

    const video = await Video.findById(videoId)

    if (!video) {
        throw new apiError(404, "Cannot Found Video")
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

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const { title, description } = req.body
    const thumbnailFileLocalPath = req.file?.path

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new apiError(400, "Video does not exist")
    }

    const existingVideo = await Video.findById(videoId)
    const oldThumbnailFileId = existingVideo?.thumbnailPublicId

    if (!existingVideo) {
        throw new apiError(404, "Video not found")
    }

    if (!existingVideo.owner.equals(req.user._id)) {
        throw new apiError(400, "Unauthorized access")
    }

    if (!title?.trim() && !description?.trim() && !thumbnailFileLocalPath) {
        throw new apiError(400, "At least one field is required")
    }

    let thumbnail;

    if (thumbnailFileLocalPath) {
        thumbnail = await uploadOnCloudinary(thumbnailFileLocalPath)
        if (!thumbnail?.url) {
            throw new apiError(400, "Error while updating thumbnail ")
        }
    }

    const updateFields = {}

    if (title?.trim()) {
        updateFields.title = title
    }

    if (description?.trim()) {
        updateFields.description = description
    }

    if (thumbnail) {
        updateFields.thumbnail = thumbnail.url
        updateFields.thumbnailPublicId = thumbnail.public_id
    }

    const video = await Video.findByIdAndUpdate(videoId,
        {
            $set: updateFields
        },
        { new: true }
    )

    if (thumbnail && oldThumbnailFileId) {
        await deleteFromCloudinary(oldThumbnailFileId)
    }

    return res
        .status(200)
        .json(new apiResponse(200, video, "Video details updated            successfully"))
})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new apiError(403, "Invalid video Id")
    }

    const video = await Video.findById(videoId)

    if (!video) {
        throw new apiError(404, "Video not found")
    }

    if (!video.owner.equals(req.user._id)) {
        throw new apiError(400, "Unauthorized access")
    }

    const videoFilePublicId = video?.videoFilePublicId
    const thumbnailPublicId = video?.thumbnailPublicId

    if (videoFilePublicId) {
        await deleteFromCloudinary(videoFilePublicId,"video")
    }

    if (thumbnailPublicId) {
        await deleteFromCloudinary(thumbnailPublicId)
    }

    await video.deleteOne()

    return res
        .status(200)
        .json(
            new apiResponse(200,
                {},
                "Video deleted successfully"
            )
        )
})

const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    
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