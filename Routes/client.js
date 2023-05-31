import express from 'express'
import { getCampaigns , getDonors , getTransactions , getGeography} from '../controllers/client.js'
const router = express.Router()

router.get('/campaigns',getCampaigns)
router.get('/donors',getDonors)
router.get('/transactions',getTransactions)
router.get('/geography',getGeography)

export default router;