import mongoose from 'mongoose';

const connectDb =async(url) =>{
    mongoose.set('strictQuery',true)
    await mongoose.connect(url)
    .then(()=> console.log(`MongooDb connected Successfully`))
    .catch((error)=> console.log(error))
}

export default connectDb;