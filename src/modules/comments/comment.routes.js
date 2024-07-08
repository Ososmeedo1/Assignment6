import { Router } from "express";
import { createComment, deleteComment, readComment, updateComment } from "./controller/comment.js";


const router = Router();

router.post('/create', createComment)
router.get('/read', readComment)
router.put('/update/:id', updateComment)
router.delete('/delete/:id', deleteComment)

export default router