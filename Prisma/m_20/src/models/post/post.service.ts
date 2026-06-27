import { prisma } from "../../lib/prisma";
import { IcreatePostPayload, IUpdatePostPayload } from "./post.interface";

const createPost = async (payload: IcreatePostPayload, userId: string) => {
  const result = await prisma.post.create({
    data: {
      ...payload,
      authorId: userId,
    },
  });

  return result;
};

const getPosts = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  });

  return posts;
};

const getPostById = async (postId: string) => {
  const existingPost = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!existingPost) {
    return null;
  }

  const updateViewPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      veiws: {
        increment: 1,
      },
    },
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  });

  return updateViewPost;
};

const getPostsStats = async () => {};

// my-post
const getMyPosts = async (authorId: string) => {
  const result = await prisma.post.findMany({
    where: {
      authorId,
    },

    orderBy: {
      createdAt: "desc",
    },

    include: {
      comments: true,
      author: {
        omit: {
          password: true,
        },
      },

      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  return result;
};

const updatePost = async (postId: string, payload: IUpdatePostPayload, authorId: string, isAdmin: boolean ) => {
  const post = await prisma.post.findFirstOrThrow({
    where: {
      id: postId,
    },
  });

  if (!isAdmin && post.authorId !== authorId) {
    throw new Error("u are not the owner of this post");
  }

  const result = await prisma.post.update({
    where: {
      id: postId,
    },

    data: payload,

    include: {
      comments: true,
      author: {
        omit: {
          password: true,
        },
      },
    },
  });

   return result
};

const deletePost = async (postId: string, authorId: string, isAdmin: boolean) => {
    const post = await prisma.post.findFirstOrThrow({
        where: {
        id: postId,
        },
    });

    if (!isAdmin && post.authorId !== authorId) {
        throw new Error("u are not the owner of this post");
    }

    await prisma.post.delete({
        where: {
            id: postId,
        }
    });
};

export const postService = {
  createPost,
  getPosts,
  getPostsStats,
  getMyPosts,
  getPostById,
  updatePost,
  deletePost,
};
