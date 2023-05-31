import mongoose from 'mongoose'

const CampaignStatSchema = new mongoose.Schema({
 productId:String,
 yearlyRaising : Number,
 YearlyTotalRaising: Number,
 year: Number,
 monthlyData: [
    {
        month: String,
        totalRaising:Number,
        totalFundUnits:Number,
    }
 ],
 dailyData : [
    {
    date: String,
    totalRaising:Number,
    totalFundUnits:Number,
 }
]
},
{
    timestamps:true
})

const CampaignStat = mongoose.model("CampaignStat", CampaignStatSchema);

export default CampaignStat;