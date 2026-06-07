import mongoose from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    const { content } = req.body

    if (!content?.trim()) {
        throw new apiError(400, "Tweet Content is required")
    }

    const tweet = Tweet.create({
        content,
        owner: req.user._id
    })

    if (!tweet) {
        throw new apiError(500, "Error while creating tweet")
    }

    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                tweet,
                "Tweeted sucessfully"
            )
        )
})

const getUserTweet = asyncHandler(async (req, res) => {
    const { userId } = req.params

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new apiError(400, "Invalid user id")
    }

    const user = await User.findById(userId)

    if (!user) {
        throw new apiError(404, "User not found")
    }

    const tweets = await Tweet.find({
        owner: userId
    }).sort({ createdAt: -1 })

    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                tweets,
                "Tweets fetched successfully"
            )
        )
})

const updateTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params
    const { content } = req.body

    if (!mongoose.Types.ObjectId.isValid(tweetId)) {
        throw new apiError(400, "Invalid tweet Id")
    }

    if (!content?.trim()) {
        throw new apiError(400, "Content is required")
    }

    const tweet = await Tweet.findById(tweetId)

    if (!tweet) {
        throw new apiError(400, "Tweet not Found")
    }

    if (!tweet.owner.equals(req.user._id)) {
        throw new apiError(403, "Unauthorized")
    }

    tweet.content = content

    await content.save()

    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                tweet,
                "Tweet Updated sucessfully"
            )
        )
})

const deleteTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params

    if (!mongoose.Types.ObjectId.isValid(tweetId)) {
        throw new apiError(400, "Invalid tweet Id")
    }

    const tweet = await Tweet.findById(tweetId)

    if (!tweet) {
        throw new apiError(400, "Tweet not Found")
    }

    if (!tweet.owner.equals(req.user._id)) {
        throw new apiError(403, "Unauthorized")
    }

    await tweet.deleteOne()

    return res
        .status(200)
        .json(
            200,
            {},
            "Tweet Deleted successfully"
        )

})

export {
    createTweet,
    getUserTweet,
    updateTweet,
    deleteTweet,
}