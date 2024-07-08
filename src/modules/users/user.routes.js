import { Router } from "express";
import { logIn, signUp, specificUser } from "./controller/user.js";


const router = Router();

router.post('/signup', signUp)
router.post('/login', logIn)
router.get('/:userId/:postId', specificUser)

export default router