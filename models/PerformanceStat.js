import mongoose from 'mongoose'

const PerformanceSchema = new mongoose.Schema({
    userId : { type: mongoose.Types.ObjectId , ref: "User"},
    performance:{
        type: [mongoose.Types.ObjectId],
        ref: "Transaction"
    }
}
)

const Performance = mongoose.model("Performance",PerformanceSchema);
export default Performance