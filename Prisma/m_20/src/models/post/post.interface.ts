import { postStatus } from "../../../prisma/generated/prisma/enums";

export interface IcreatePostPayload {
    title: string,
    content: string,
    thumbnail?: string,
    isFeatured?: boolean,
    status?: postStatus,
    tags: string[] 
}

export interface IUpdatePostPayload {
    title?: string,
    content?: string,
    thumbnail?: string,
    isFeatured?: boolean,
    status?: postStatus,
    tags?: string[] 
}