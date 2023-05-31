import User from '../models/user.js'
import OverallStat from '../models/OverallStat.js'
import Transaction from '../models/Transaction.js'

export const getUser = async (req,res) =>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const getDashboardStats = async (req,res) =>{
    try {
        //HARDCODE VALUES//
        const currentMonth = "November";
        const currentYear = 2021;
        const currentDay = "2021-11-03"
        //RECENT TRANSACTIONS//
        const transactions = await Transaction.find().limit(50).sort({createdOn: -1})

        //RECENT OVER ALL STATS//
        const overallStat = await OverallStat.find({year: currentYear})
        
        const {
            totalDonors,
            yearlyFunds,
            yearlyFundsTotal,
            monthlyData,
            fundsByDonors
        } = overallStat[0]

        const thisMonthStat = overallStat[0].monthlyData.find(({month})=>{
            return month === currentMonth
        })
        const TodayStat = overallStat[0].dailyData.find(({date})=>{
            return date === currentDay
        })

        res.status(200).json({
            totalDonors,
            yearlyFunds,
            yearlyFundsTotal,
            monthlyData,
            fundsByDonors,
            thisMonthStat,
            TodayStat,
            transactions
        })

    } catch (error) {
        res.status(404).json({message:error.message})
    }
}