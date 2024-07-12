import 'dotenv/config';
import express from "express";
import CORS from 'cors';
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth_Routes.js'
import connectDB from './config/database.js';

const PORT = process.env.AUTH_SERVER_PORT;
const mongoDB_URI = process.env.AUTH_DB_URI;
const app = express();

//---------------------------Middlewares----------------------------

//Parsing request body 
app.use(express.json());

//Handling CORS Policy
// app.use(CORS({}));
app.use(CORS({
    origin: process.env.PUBLIC_SERVER_URI,
    methods: ['POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
    exposedHeaders: ["set-cookie"]
}));

//Routes
app.use('/login', authRoutes);

//Cookies
app.use(cookieParser());


//--------------------------Database Connection----------------------------
connectDB(mongoDB_URI.toString()).then((res) => {
    if(res == true) {
        app.listen(PORT, () => { 
            console.log(`App is listening to port: ${PORT}`); 
        });
    } else {
        console.log('Database connection failed');
        process.exit(0)
    }
    return
})
