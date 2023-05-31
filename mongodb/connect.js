import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()

const connectDb = async () => {
    mongoose.set('strictQuery', true);
    await mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => {
        console.log(`MongoDB connected successfully`);
      })
      .catch((error) => console.log(error));
  };
  
  export default connectDb