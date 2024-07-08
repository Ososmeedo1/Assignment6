import { Router } from "express";
import { createPost, deletePost, readPost, specificPost, updatePost } from "./controller/post.js";

const router = Router();

router.post('/create', createPost)
router.get('/read', readPost)
router.put('/update/:id', updatePost)
router.delete('/delete/:id', deletePost)
router.get('/:id', specificPost)

export default router