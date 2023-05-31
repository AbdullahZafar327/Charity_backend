import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import * as dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'

import clientRoutes from './Routes/client.js'
import managementRoutes from './Routes/management.js'
import generalRoutes from './Routes/general.js'
import fundRoutes from './Routes/funds.js'

//DATA IMPORTS//
import User from './models/user.js'
import { dataUser }  from './data/index.js'
import Campaign from './models/charityCampaign.js'
import CampaignStat from './models/campaignStat.js'
import Transaction from './models/Transaction.js'
import OverallStat from './models/OverallStat.js'
import Performance from './models/PerformanceStat.js'
import { dataCampaign , dataCampaignStat , dataTransaction , dataOverallStat , dataPerformanceStat} from './data/index.js'
import connectDb from './mongodb/connect.js'

//CONFIGURATIONS//
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy:"cross-origin"}))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false }))
app.use(cors())

//ROUTES//
app.use('/client',clientRoutes)
app.use('/general',generalRoutes)
app.use('/management',managementRoutes)
app.use('/funds',fundRoutes)

//MONGOOSE SETUP//
const PORT  = process.env.PORT ||  9000;

const startServer = async () =>{

  try {
      connectDb(process.env.MONGODB_URL)
      app.listen(PORT,()=> console.log(`Server has Started on Port http://localhost:${PORT}`))
  } catch (error) {
      console.log(error)
  }
  
}

startServer();
