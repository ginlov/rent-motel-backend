import { Router } from 'express';

import { login, register } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/api/auth/login', login);

authRouter.post('/api/auth/register', register);

export default authRouter;
