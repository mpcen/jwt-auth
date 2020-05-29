import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { NotFoundError } from './errors/not-found-error';
import { signinRouter } from './routes/auth/signin';
import { signupRouter } from './routes/auth/signup';
import { currentUserRouter } from './routes/auth/current-user';
import { errorHandler } from './middlewares/error-handler';

const app = express();

app.use(json());
app.use(signinRouter);
app.use(signupRouter);
app.use(currentUserRouter);

app.all('*', () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
