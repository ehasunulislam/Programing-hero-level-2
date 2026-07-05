import { CommentStatus, postStatus } from "../../../prisma/generated/prisma/enums";
import { PostWhereInput } from "../../../prisma/generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { IcreatePostPayload, IPostQuery, IUpdatePostPayload } from "./post.interface";

const createPost = async (payload: IcreatePostPayload, userId: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId
    },
    include: {
      subscription: true
    }
  });

  if(payload.isPremimum && user.subscription?.status !== "ACTIVE") {
    throw new Error("u are not a premium user, please subscribe to create premium post")
  }


  const result = await prisma.post.create({
    data: {
      ...payload,
      authorId: userId,
    },
  });

  return result;
};



const getPosts = async (query: IPostQuery) => {

  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder ? query.sortOrder : "desc";

  const tags = query.tags ? JSON.parse(query.tags as string) : null
  const tagsArray = Array.isArray(tags) ? tags : []

  const andCondition : PostWhereInput[] = [];
  if(query.searchTearm) {
    OR : [
      {
        title : {
          contains: query.searchTearm,
          mode: "insensitive"
        },
      },
      {
        content: {
          contains: query.searchTearm,
          mode: "insensitive"
        }
      }
    ]
  }

  if(query.title) {
    andCondition.push({
      title: query.title
    })
  }

  if(query.content) {
    andCondition.push({
      content: query.content
    })
  }

  if(query.authorId) {
    andCondition.push({
      authorId: query.authorId
    })
  }

  if(query.isFeatured) {
    andCondition.push({
      isFeatured: Boolean(query.isFeatured)
    })
  }

  if(query.tags) {
    andCondition.push({
      tags: {
        hasSome: tagsArray
      }
    })
  }

  
  if(query.status) {
    andCondition.push({
      status: query.status
    })
  }

  andCondition.push({
    isPremimum: false
  })

  const posts = await prisma.post.findMany({
    // searching or partial match
    where: {
      AND: andCondition
    },

    take: limit,
    skip: skip,

    orderBy: {
      [sortBy] : sortOrder
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

  const totalPostCount = await prisma.post.count({
    where: {
      AND: andCondition
    }
  })

  return {
    data: posts,
    meta: {
      page: page,
      limit: limit,
      total: totalPostCount,
      totalPage: Math.ceil(totalPostCount / limit)
    }
  };
};

const getPostById = async (postId: string) => {
//   await prisma.post.update({
//     where: {
//       id: postId,
//     },
//     data: {
//       veiws: {
//         increment: 1,
//       },
//     }
//   });

//   const post = await prisma.post.findUniqueOrThrow({

//   })

//   return post;

  const transactionResult = await prisma.$transaction(
    async(tx) => {
        await tx.post.update({
            where: {
              id: postId,                   
            },
            data: {
                veiws: {
                    increment: 1
                }
            }
        });

        const post = await tx.post.findUniqueOrThrow({
            where: {
                id: postId,
                isPremimum:  false
            },

            include: {
                author: {
                    omit: {
                        password: true
                    }
                },

                comments: {
                    where:{
                        status: CommentStatus.APPROVED
                    },

                    orderBy: {
                        createdAt: "desc"
                    }
                },

                _count: {
                    select: {
                        comments: true
                    }
                }
            }
        })

        return post
    }
  );

  return transactionResult
};

const getPostsStats = async () => {
  const transactionResult = await prisma.$transaction(
    async(tx) => {
        // const totalPosts = await tx.post.count();

        // const totalPublishedPosts = await tx.post.count({
        //     where: {
        //         status: postStatus.PUBLISHED
        //     }
        // });

        // const totalDraftPosts = await tx.post.count({
        //     where: {
        //         status: postStatus.DRAFT
        //     }
        // });

        // const totalArchivedPosts = await tx.post.count({
        //     where: {
        //         status: postStatus.ARCHIVED
        //     }
        // });

        // const totalComments = await tx.comment.count();

        // const totalApprovedComments = await tx.comment.count({
        //     where: {
        //         status: CommentStatus.APPROVED
        //     }
        // });

        // const totalRejectedComments = await tx.comment.count({
        //     where: {
        //         status: CommentStatus.REJECT
        //     }
        // });

        // const totalPostViews = await tx.post.aggregate({
        //     _sum: {
        //         veiws: true
        //     }
        // })

        // return {
        //     totalPosts,
        //     totalPublishedPosts,
        //     totalDraftPosts,
        //     totalArchivedPosts,
        //     totalComments,
        //     totalApprovedComments,
        //     totalRejectedComments,
        //     totalPostViews
        // }

    const [
        totalPosts,
        totalPublishedPosts,
        totalDraftPosts,
        totalArchivedPosts,
        totalComments,
        totalApprovedComments,
        totalRejectedComments,
        totalPostViews
        ] = await Promise.all([
            await tx.post.count(),
            await tx.post.count({
                where: {
                    status: postStatus.PUBLISHED
                }
            }),
            await tx.post.count({
                where: {
                    status: postStatus.DRAFT
                }
            }),
            await tx.post.count({
                where: {
                    status: postStatus.ARCHIVED
                }
            }),
            await tx.comment.count(),
            await tx.comment.count({
                where: {
                    status: CommentStatus.APPROVED
                }
            }),
            await tx.comment.count({
                where: {
                    status: CommentStatus.REJECT
                }
            }),
            await tx.post.aggregate({
                _sum: {
                    veiws: true
                }
            })
    ])

    return {
            totalPosts,
            totalPublishedPosts,
            totalDraftPosts,
            totalArchivedPosts,
            totalComments,
            totalApprovedComments,
            totalRejectedComments,
            totalPostViews : totalPostViews._sum.veiws
    }
    }

  )

  return transactionResult
};

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
