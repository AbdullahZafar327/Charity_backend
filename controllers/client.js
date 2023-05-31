import Campaign from '../models/charityCampaign.js'
import campaignStat from '../models/campaignStat.js'
import User from '../models/user.js'
import Transaction from '../models/Transaction.js';
import getCountryISO3 from 'country-iso-2-to-3'

export const getCampaigns = async (req,res) => {
  try {
    const campaigns = await Campaign.find();
    const campaignsStats = await Promise.all(
        campaigns.map(async (campaign) => {
            const stat = await campaignStat.find({
                productId : campaign._id
            })
            return {
                ...campaign._doc,
                stat
            }
        })
    )

    res.status(200).json(campaignsStats)
  } catch (error) {
    res.status(404).json({message:error.message})
  }
}

export const getDonors = async(req,res) =>{
  try {
    const donors = await User.find({role:"user"}).select("-password")
    res.status(200).json(donors)
    
  } catch (error) {
    res.status(404).json({message:error.message})
  }
}

export const getTransactions = async (req,res) => { 
  try {
    //sort should look like this : {"filed" : "userId" , "sort" : "desc"}
     const { page = 1, pageSize= 20 , sort = null , search = ""} = req.query;
    //formatted sort should look like this {userId: -1}
     const generateSort = () =>{
      const sortParsed = JSON.parse(sort)
      const formattedSort = {
        [sortParsed.field] : sortParsed === "asc" ? 1 : -1
      }
      return formattedSort
     }

     const sortFormatted = Boolean(sort)? generateSort() : {}

     const transactions = await Transaction.find({
      $or : [
        {
          cost : {$regex : new RegExp(search, "i")},
          
        },
        {
          userId : {$regex : new RegExp(search, "i")},
        }
      ]
     }).sort(sortFormatted).skip(page * pageSize).limit(pageSize)

     const total = await Transaction.countDocuments({
      name: {
        $regex : search , $options : 'i'}
     })
    
     res.status(200).json({transactions,total})
    
  } catch (error) {
    
    res.status(404).json({message:error.message})
  }
}

export const getGeography = async(req,res) =>{
  try{
   const user = await User.find();

   const mappedLocation = user.reduce((acc,{country})=>{
     const countryISO3 = getCountryISO3(country);
     if(!acc[countryISO3]){
      acc[countryISO3] = 0
     }
     acc[countryISO3]++;
     return acc;

   },{})

   const formattedLocations = Object.entries(mappedLocation).map(([country,count])=>{
    return {id:country, value: count}
   })

   res.status(200).json(formattedLocations)
  }catch (error) {
    
    res.status(404).json({message:error.message})
  }
}
