import 'dotenv/config';
import express from "express";
import CORS from 'cors';
import userRoutes from './routes/user_Routes.js';
import connectDB from './config/database.js';
import { allowedOrigins } from './config/config.js';

const PORT = process.env.MAIN_SERVER_PORT;
const mongoDB_URI = process.env.MAIN_DB_URI;
const app = express();

//---------------------------Middlewares----------------------------

//Parsing request body 
app.use(express.json());

//Handling CORS Policy
// app.use(CORS({}));
app.use(CORS({
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

//Handle Form Data
// app.use(express.urlencoded({extended: false}));

//Routes
app.use('/candidate', userRoutes);


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