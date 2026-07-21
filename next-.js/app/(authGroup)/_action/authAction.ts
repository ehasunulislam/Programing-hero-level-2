"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import jwt, { JwtPayload } from "jsonwebtoken"

type LoginState = {
    success: true,
    statusCode: number,
    message: string,
    data: {
        accessToken: string,
        refreshToken: string
    }
}


export const loginAction = async(prevState: LoginState, formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    const paylaod = {
        email, password
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type" :  "application/json"
        },
        body: JSON.stringify(paylaod)
    });

    // const result : LoginState = await res.json();  -> Login state deoar karon LoginFrom a useActionState a Error dai.

    const result = await res.json();

    // next.js cookie store formula
    if(result.success) {
        const cokkieStrore = await cookies();

        cokkieStrore.set("accessToken", result.data.accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            sameSite: "lax"
        });

        cokkieStrore.set("refreshToken", result.data.refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax"
        });

        const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

        if(decodedToken.role === "USER") {
            redirect("/dashboard", "replace");
        } else if(decodedToken.role === "ADMIN") {
            redirect("/admin-dashboard", "replace");
        } else if(decodedToken.role === "AUTHOR") {
            redirect("/author-dashboard", "replace");
        }   
    }

    return result
}