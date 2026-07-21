"use server"

import { cookies } from "next/headers"

export const getNewAccessToken = async() => {
    const cookieStrore = await cookies();

    const refreshToken = cookieStrore.get("refreshToken")?.value;

    if(!refreshToken) {
        // throw new Error("User not logged in")

        return {
            success: false,
            message: "Refresh token not found"
        }
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/refresh-token`, {
        method: "POST",
        headers: {
            Cookie: `refreshToken=${refreshToken}`
        },

        cache: "no-cache",
    });

    const result = await res.json();

    return result
}