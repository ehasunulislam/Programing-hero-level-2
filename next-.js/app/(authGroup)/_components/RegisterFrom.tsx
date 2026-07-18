"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const RegisterFrom = () => {
    return (
        <form className="space-y-4">
            <Card className="p-5 space-y-4">
                <Input name="name" type="text" placeholder="Name" required />
                <Input name="email" type="email" placeholder="Email" required />
                <Input name="password" type="password" placeholder="Password" required />

                <Button type="submit">
                    Register
                </Button>
            </Card>
        </form>
    )
}

export default RegisterFrom