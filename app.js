import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRoute from './routes/userRoutes.js';
import authRoute from './routes/authRoutes.js';
import communityRoute from './routes/communityRoutes.js';
import postRoute from './routes/postRoutes.js';
import commentRoute from './routes/commentRoutes.js';
import cors from 'cors';

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
const PORT = 1337;

const connect = async () => {
    try {
        await mongoose.connect('', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'citadel',
        });
        console.log('connected to MongoDB');
    } catch (err) {
        console.log(err);
    }
};

connect();

// app.use('/api/post', postRoute);
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);
app.use('/api/community', communityRoute);
app.use('/api/comment', commentRoute);
// app.use('/api/community', communityRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Something went wrong!';

    return res.status(errorStatus).send(errorMessage);
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
