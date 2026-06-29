import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { postService } from "./post.service";
import httpStatus from "http-status";
import { sendResponse } from "../../utils/SendResponse";

const createPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;
    const payload = req.body;

    const result = await postService.createPost(payload, id as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Post created successfully",
      data: result,
    });
  },
);

const getPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query
    const result = await postService.getPosts(query);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "All posts here",
      data: result,
    });
  },
);

const getPostById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;

    if (!postId) {
      throw new Error("post ud required in params");
    }

    const result = await postService.getPostById(postId as string);

    if (!result) {
      sendResponse(res, {
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: "Post not found",
        data: null,
      });
      return;
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Post fetched successfully",
      data: result,
    });
  },
);

const getPostsStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await postService.getPostsStats();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Post stats retrieved successfully",
        data: result
    })
  },
);

// my-post
const getMyPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;

    const result = await postService.getMyPosts(authorId as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "My Posts Recieve Successfully",
      data: result,
    });
  },
);

const updatePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    const isAdmin = req.user?.role === "ADMIN"

    const payload = req.body;
    const postId = req.params.postId

    const result = await postService.updatePost(postId as string, payload, authorId as string, isAdmin);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Posts updated Successfully",
      data: result,
    });
  }
);

const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    const isAdmin = req.user?.role === "ADMIN"

    const postId = req.params.postId
    if (!postId) {
      throw new Error("post ud required in params");
    }

    await postService.deletePost(postId as string, authorId as string, isAdmin);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Posts deleted Successfully",
      data: null,
    });
  }
);

export const postController = {
  createPost,
  getPosts,
  getPostsStats,
  getMyPosts,
  getPostById,
  updatePost,
  deletePost,
};
