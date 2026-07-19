"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers"


export const logout = async() => {
    const cookieStrore = await cookies();

    cookieStrore.delete("accessToken");
    cookieStrore.delete("refreshToken");

    revalidateTag("my-profile", "max");
    // redirect("/login")
}