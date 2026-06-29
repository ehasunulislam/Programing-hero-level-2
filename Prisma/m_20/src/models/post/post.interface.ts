import { postStatus } from "../../../prisma/generated/prisma/enums";
import { PostWhereInput } from "../../../prisma/generated/prisma/models";

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

export interface IPostQuery extends PostWhereInput {
  title ?: string
  comment ?: string

  searchTearm ?: string
  page ?: string,
  limit ?: string,
  sortOrder ?: string
  sortBy ?: string
}



