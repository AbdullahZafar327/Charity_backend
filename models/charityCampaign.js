import mongoose from 'mongoose'

const CampaignSchema = new mongoose.Schema({
 name: String,
 Start_Date: String,
 End_date: String,
 description: String,
 donor_count:Number,
 price: Number,
 charity_name: String,
 imgUrl: String
})

const Campaign = mongoose.model("Campaign", CampaignSchema);

export default Campaign;