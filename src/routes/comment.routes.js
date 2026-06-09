import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addComment, deleteComment, getVideoComment, updateComment } from "../controllers/comment.controller.js";

const router = Router()

router.route("/video/:videoId").post(verifyJWT,addComment)
router.route("/video/:videoId").get(getVideoComment)
router.route("/:commentId").patch(verifyJWT,updateComment)
router.route("/:commentId").delete(verifyJWT,deleteComment)

export default router