import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { Role } from "../../../prisma/generated/prisma/enums";
import { commentController } from "./comment.controller";


const router  = Router();

router.post("/", authMiddleware.auth(Role.ADMIN, Role.AUTHOR, Role.USER), commentController.createComment);

router.get("/auth/:authorId", commentController.getCommentByAuthorId);

router.get("/:commentId", commentController.getCommentByPostId);

router.patch(
    "/:commentId",
    authMiddleware.auth(Role.ADMIN, Role.AUTHOR, Role.USER),
    commentController.updateComment
);

router.delete(
    "/:commentId",
    authMiddleware.auth(Role.ADMIN, Role.AUTHOR, Role.USER),
    commentController.deleteComment
);

router.put(
    "/:commentId/moderate",
    authMiddleware.auth(Role.ADMIN),
    commentController.moderateComment
)



export const commentRouts = router;