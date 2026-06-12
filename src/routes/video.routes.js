import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { deleteVideo, getVideoById, publishAVideo, updateVideo } from "../controllers/video.controller.js";


const router = Router()

router.route("/upload").post(verifyJWT,
    upload.fields([
        {
            name: "videoFile",
            maxCount: 1,
        },

        {
            name: "thumbnail",
            maxCount: 1,
        }
    ]),
    publishAVideo
)
router.route("/:videoId").get(getVideoById)
router.route("/:videoId").patch(verifyJWT,upload.single("thumbnail"),updateVideo)
router.route("/:videoId").delete(verifyJWT,deleteVideo)

export default router