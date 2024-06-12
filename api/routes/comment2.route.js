import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  createComment2,
  deleteComment2,
  editComment2,
  getPostComments2,
  getComments2,
  likeComment2,
} from '../controllers/comment2.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createComment2);
router.get('/getPostComments/:postId', getPostComments2);
router.put('/likeComment/:commentId', verifyToken, likeComment2);
router.put('/editComment/:commentId', verifyToken, editComment2);
router.delete('/deleteComment/:commentId', verifyToken, deleteComment2);
router.get('/getComments', verifyToken, getComments2);

export default router;
