import {type Request,type Response , type NextFunction } from "express"
import {ZodType} from "zod"
import jwt from "jsonwebtoken"


export function UserAuth(schema:ZodType){
    return (req:Request,res:Response,next:NextFunction)=>{
         const result = schema.safeParse(req.body)
         if(!result.success){
            res.send(500).json({
                message:"Bad Request",
                error: result.error.issues
            })
            return 
         }
         next()
    }
}


export function MiddlewareAuth(req:Request,res:Response, next:NextFunction){
    const authHeader=req.headers['authorization']
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        res.status(500).send("Invalid auth format. Missing Header or Bearer token ")
        return
    }
    try{
       const token = authHeader.split(" ")[1]
       const verify= jwt.verify(token!,process.env.JWT_KEY!)
       req.body=verify
       next()
    }catch(error){
       res.status(401).send("User is not authorized to access this")
       return 
    }

}