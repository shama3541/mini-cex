import { Router } from "express";

import { UserEndpoint, CreateUser, SignIn } from "../controller/userController";
import { signInSchema,createUserSchema } from "../middleware/zodSchema";
import { UserAuth,MiddlewareAuth } from "../middleware/middleWare";


const router = Router();

router.get("/userendpoint",MiddlewareAuth, UserEndpoint);
router.post("/signup",UserAuth(createUserSchema), CreateUser);
router.post("/signin",UserAuth(createUserSchema), SignIn);

export default router;
