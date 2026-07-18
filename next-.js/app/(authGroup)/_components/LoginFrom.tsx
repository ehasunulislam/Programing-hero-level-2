"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { loginAction } from "../_action/authAction"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
// import { useRouter } from "next/navigation"

const LoginFrom = () => {
    const [state, action, pending] = useActionState(loginAction, false);
    // const router = useRouter();

    useEffect(() => {
        if(!state) return;

        if(state.success) {
           toast.success(state.message || "login success");
        //    router.push("/dashboard");
        }

        if(!state.success) {
           toast.error(state.message || "login-faild")
        }
    }, [state])

    return (
        <form action={action} className="space-y-4">
            <Card className="p-5 space-y-4">
                <Input name="email" type="email" placeholder="Email" required />
                <Input name="password" type="password" placeholder="Password" required />

                <Button type="submit">
                    {
                        pending ? "Submiting..."  : "Login"
                    }
                </Button>
            </Card>
        </form>
    )
}

export default LoginFrom