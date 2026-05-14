import { type Request, type Response } from "express"
import { PrismaClient } from "@prisma/client"

import { type Request, type Response } from "express"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! })
})

export async function UserEndpoint(req: Request, res: Response) {
    res.send("the user route is working perfectly good")
}

export async function CreateUser(req: Request, res: Response): Promise<void> {
    console.log("CreateUser hit")
    console.log("Body:", req.body)
    const { email, firstName, lastName, password } = req.body
    try {
        const user = await prisma.user.create({
            data: { email, firstName, lastName, password }
        })

        res.status(201).json({
            message: "User created",
            data: user
        })
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ message: "Error while creating user" })
    }
}