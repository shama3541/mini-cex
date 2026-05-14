import { type Request, type Response } from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { password } from "bun";
import Jwt from "jsonwebtoken";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

export async function UserEndpoint(req: Request, res: Response) {
  res.send("the user route is working perfectly good");
}

export async function CreateUser(req: Request, res: Response): Promise<void> {
  const { email, firstName, lastName } = req.body;
  const plainpassword = req.body.password;
  const hashedpassword = await password.hash(plainpassword, {
    algorithm: "bcrypt",
    cost: 4,
  });
  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: hashedpassword,
      },
    });

    res.status(201).json({
      message: "User created",
      data: user,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Error while creating user" });
  }
}

export async function SignIn(req: Request, res: Response): Promise<void> {
  try {
    const { email, password: plainPassword } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY is not defined in environment variables");
    }
    const jwtoken = Jwt.sign(
        { email: email },
        process.env.JWT_KEY
    );
    const isMatch = await password.verify(plainPassword, user.password);
    if (isMatch) {
      res.status(200).json({ message: "Login successful" ,
        token: jwtoken
      });
      return;
    }

    res.status(401).json({ message: "Incorrect password" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Error while logging in" });
  }
}
