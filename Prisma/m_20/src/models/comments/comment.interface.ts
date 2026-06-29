import { CommentStatus } from "../../../prisma/generated/prisma/enums";

export interface ICreateCommentPayload {
    postId: string;
    authorId: string;
    comment: string;
}

export interface IUpdateCommentPayload { 
    comment ?: string, 
    status ?: CommentStatus
}

export interface IModerateCommentPayload {
    status: CommentStatus
}