import express from 'express'
import {getUser , getDashboardStats} from '../controllers/general.js'

const router = express.Router()

router.get('/user/:id',getUser);
router.get('/dashboardStats', getDashboardStats)

export default router;