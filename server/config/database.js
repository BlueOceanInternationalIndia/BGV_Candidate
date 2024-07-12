import mongoose from 'mongoose';

const connectDB = async (mongoDB_URI) => {
    
    const status = await mongoose.connect(mongoDB_URI).then((connData) => {
        console.log(`App connected to database ${connData.connection.host}`);
        return true     
    }).catch((err) => {
        console.log(`Database connection failed.\nError: ${err}`);
        return false
    });
    return status
};

export default connectDB