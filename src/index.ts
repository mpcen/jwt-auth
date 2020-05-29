require('dotenv').config();
import mongoose from 'mongoose';

import { app } from './app';

const { JWT_KEY, MONGO_URI, EXPRESS_PORT } = process.env;

const start = async () => {
    if (!JWT_KEY || !MONGO_URI || !EXPRESS_PORT) {
        throw new Error('You must define your ENV VARS');
    }

    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
    }

    app.listen(EXPRESS_PORT, () => {
        console.log(`Listening on port ${EXPRESS_PORT}!`);
    });
};

start();
