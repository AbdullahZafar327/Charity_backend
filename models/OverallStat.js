import mongoose from 'mongoose'

const OverallStateSchema = new mongoose.Schema({
 totalDonors:Number,
 yearlyFunds: Number,
 yearlyFundsTotal:Number,
 year:Number,
 monthlyData: [
    {
        month: String,
        totalRaising:Number,
        totalFundUnits:Number,
    }
 ],
 dailyData : [{
    date: String,
    totalRaising:Number,
    totalFundUnits:Number,
 }],
 fundsByDonors:{
    type:Map,
    of:Number
 }
},
{
    timestamps:true
})

const OverallStat= mongoose.model("OverallStat", OverallStateSchema);

export default OverallStat