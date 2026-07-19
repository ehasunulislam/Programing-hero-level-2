"use server"

import { cookies } from "next/headers"

export const getMe = async() => {
    const cookieStrore = await cookies();

    const accessToken = cookieStrore.get("accessToken")?.value;

    if(!accessToken) {
        // throw new Error("User not logged in")

        return {
            success: false,
            message: "User not logged in"
        }
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/me`, {
        headers: {
            Cookie: `accessToken=${accessToken}`
        },

        cache: "force-cache",
        next: {
            revalidate: 60 * 60 * 24,
            tags: ["my-profile"]
        }
    });

    const result = res.json();
    console.log(result);

    return result
}