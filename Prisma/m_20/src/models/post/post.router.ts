import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { Role } from "../../../prisma/generated/prisma/enums";
import { postController } from "./post.controller";

const router = Router();

router.post(
  "/",
  authMiddleware.auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  postController.createPost,
);

router.get("/", postController.getPosts);

router.get(
  "/stats",
  authMiddleware.auth(Role.ADMIN),
  postController.getPostsStats,
);

// my-post
router.get(
  "/my-post",
  authMiddleware.auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  postController.getMyPosts,
);

router.get("/:postId", postController.getPostById);

router.patch(
  "/:postId",
  authMiddleware.auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  postController.updatePost,
);

router.delete(
  "/:postId",
  authMiddleware.auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  postController.deletePost,
);

export const postRouts = router;
