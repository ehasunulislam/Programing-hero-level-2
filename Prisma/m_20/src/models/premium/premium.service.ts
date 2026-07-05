import { prisma } from "../../lib/prisma"

const getPremiumContents = async () => {

    // age ai toko kore noi
    const posts = await prisma.post.findMany({
        where: {
            isPremimum: true
        }
    })

    return posts
}

export const premiumService = {
    getPremiumContents
}