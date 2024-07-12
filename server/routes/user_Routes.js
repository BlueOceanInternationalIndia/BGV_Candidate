import express from "express";
import authServerToken_Authenticate from '../middleware/authTokenCheck.js';
import fileRoutes from './user_Routes/file_Route.js'
import logRoute from './user_Routes/log_Route.js'
import consentRoute from './user_Routes/consent_Route.js'
import PD_Route from './user_Routes/PD_Route.js'
import AV_Route from './user_Routes/AV_Route.js'
import IV_Route from './user_Routes/IV_Route.js'
import EduV_Route from './user_Routes/EduV_Route.js'

const router = express.Router();

// router.get('/', (req, res) => { 
//     return res.status(234).send('Server Setup Complete');
// });

router.use('/files', fileRoutes);
router.use('/log', logRoute);
router.use('/consent', consentRoute);
router.use('/personaldetails', PD_Route);
router.use('/addressdetails', AV_Route);
router.use('/identitydetails', IV_Route);
router.use('/educationdetails', EduV_Route);



export default router