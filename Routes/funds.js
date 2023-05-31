import express from 'express'
import {getOverallStat} from '../controllers/funds.js'
const router = express.Router()

router.get('/overAllStat', getOverallStat)

export default router;