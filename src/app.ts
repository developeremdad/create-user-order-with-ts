import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { userRouter } from './app/modules/user/user.routes';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// Application all routers
app.use('/api/users', userRouter);

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Congratulation! server is running',
    data: null,
  });
});

export default app;
