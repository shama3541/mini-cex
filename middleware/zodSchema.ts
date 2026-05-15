import z from "zod"



export const createUserSchema = z.object({
    email: z.email("Invalid email"),
    firstName: z.string().min(1, "First name required"),
    lastName: z.string().min(1, "Last name required"),
    password: z.string().min(6, "Password must be at least 6 characters")
})

export const signInSchema = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(1, "Password required")
})