"use server"

import { cookies } from "next/headers"

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
    console.log(formData);
    console.log(prevState);

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
    }

    return result
}