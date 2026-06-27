import { prisma } from "../../lib/prisma";
import { IcreatePostPayload } from "./post.interface";

const createPost = async (payload: IcreatePostPayload, userId: string) => {
    const result = await prisma.post.create({
        data: {
            ...payload,
            authorId: userId
        }
    });

    return result
};

const getPosts = async () => {

};

const getPostsStats = async () => {

};

const getMyPosts = async () => {

};

const getPostById = async () => {

};

const updatePost = async () => {

};

const deletePost = async () => {

};

export const postService = {
    createPost,
    getPosts,
    getPostsStats,
    getMyPosts,
    getPostById,
    updatePost,
    deletePost
};