import {Router} from "express"


import { UserEndpoint,CreateUser,SignIn } from "../controller/userController"

const router = Router ()


router.get("/userendpoint",UserEndpoint)
router.post("/signup",CreateUser)
router.post("/signin",SignIn)


export default router