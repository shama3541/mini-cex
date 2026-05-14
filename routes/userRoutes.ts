import {Router} from "express"

import { UserEndpoint,CreateUser } from "../controller/userController"

const router = Router ()


router.get("/userendpoint",UserEndpoint)
router.post("/signup",CreateUser)



export default router