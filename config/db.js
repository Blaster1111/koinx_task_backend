import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
    }catch(e){
        console.log('Database connection failed:',e.message);
        process.exit(1);

    }
}

export default connectDB;