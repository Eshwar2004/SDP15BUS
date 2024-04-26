// auth.route.js

import express from 'express';
import { signup, signin } from '../controller/auth.controller.js';

const router = express.Router();

// POST request to handle user signup
router.post('/signup', signup);

// POST request to handle user signin
router.post('/signin', signin);



export default router;
