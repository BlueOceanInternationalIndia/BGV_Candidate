import 'dotenv/config';
import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AccInfo } from "../models/admin_models/account_Model.js";
import { TokenInfo } from '../models/admin_models/token_Model.js';

const router = express.Router();


//-------------------Routes-----------------------
//Home Page
// router.get('/', (req, res) => { 
//     return res.status(234).send('Auth Server Setup Complete');
// });

//Create New Entry in Database
router.post('/', async (req, res) => {
console.log('Registering New Account\n', req.body);
console.log(!req.body.id,
    !req.body.name,
    !req.body.email,
    !req.body.username,
    !req.body.password,
    !req.body.log_1,
    !req.body.log_2,
    !req.body.log_3);

    //Validating the input
    if( req.body.id == null ||
        !req.body.name ||
        !req.body.email ||
        !req.body.username ||
        !req.body.password ||
        !req.body.log_1 ||
        !req.body.log_2 ||
        !req.body.log_3
    ) {
        return res.status(400).send({
            message: 'Input fields missing. Invalid request',
            constructor: {
                id: "number",
                name: "text",
                email: "text",
                username: "text",
                password: "text",
                log_1: "Date",
                log_2: "Date",
                log_3: "Date"
            }
        });
    }

    //Defining a new entry
    const hashedPass = await bcrypt.hash(req.body.password, 10),
            newEntry = {
                id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: hashedPass,
                log_1: req.body.log_1,
                log_2: req.body.log_2,
                log_3: req.body.log_3
            };

    //Creating a new entry
    await AccInfo.create(newEntry).then((entry) => {
        console.log(`New Entry Created in Candidate Login Details:\n${entry}`);
        return res.status(201).send({
            message: `New Entry Created`,
            data: entry
        });
    }).catch((err) => {
        console.log(`Failed to create new entry in Candidate Login Details with error:\n${err}`);
        res.status(500).send({
            message: 'Failed to create new entry',
            error: err.message
        });   
    });
});

//Get All Entries
router.get('/', async (req, res) => {
    try {
        //Retrieving Book data from Database
        console.log(`Retrieving Account List`);
        const entries = await AccInfo.find({});

        console.log(`Sending Account List`);
        return res.status(200).json({
            count: entries.length,
            data: entries
        });
    }
    catch(error) {
        console.log(`Failed to get entry data with Error:\n${error}`);
        res.status(500).send({
            message: 'Failed to get entry data',
            error: error.message
        });    
    }
});


//User Authentication
router.post('/auth', async (req, res) => {
    try{
        const username = req.body.user_name__,
            password = req.body.pass_word__;

        console.log(`Authenticating Login for ${username}`);
        const user = await AccInfo.findOne({username: username}).select('password log_1 log_2');
        if(user == null) {
            console.log(`Invalid Credentials`); 
            return res.status(200).json({
                message: 'Invalid Credentials',
                auth: false
            });  
        };

        console.log('User Found, Checking password'); 
        const passValid = await bcrypt.compare(password, user.password);
        if(passValid == false) {
            console.log(`Invalid Credentials`); 
            return res.status(200).json({
                message: 'Invalid Credentials',
                auth: false
            });  
        };
                      
        console.log(`User ${username} authenticated`);
        const tokenObj = {user : username},
            accessSecret = process.env.ACCESS_TOKEN_SECRET,
            refreshSecret = process.env.REFRESH_TOKEN_SECRET,
            rTa_Exp_Hrs = 3,
            aTr_Exp_Min = 15;

        const accessToken = jwt.sign(tokenObj, accessSecret, {expiresIn: `${aTr_Exp_Min}s`});
        const refreshToken = jwt.sign(tokenObj, refreshSecret, {expiresIn: `${rTa_Exp_Hrs}h`})
        if(accessToken == null || refreshToken == null) {
            console.log(`Could not create session token, try again`); 
            return res.status(502).json({
                message: 'Invalid Session Token',
                auth: false
            });  
        }
        console.log(`Access Token Created ${accessToken}`);
        console.log(`Refresh Token Created ${refreshToken}`);

        //Saving Refresh Token to Database
        const newToken = {
            token: refreshToken
        }

        await TokenInfo.create(newToken).then(() => {
            console.log('New Token Added');
        }).catch((err) => {
            console.log(`Failed to Add Token\n${err}`);
            res.status(502).send({
                message: 'Failed to create new entry',
                error: err.message
            });   
        });

        res.cookie('aTr', accessToken, {
            secure: true,
            httpOnly: false, 
            expires: new Date(Date.now() + (aTr_Exp_Min * 60000))
        });
        res.cookie('rTa', refreshToken, {
            secure: true,
            httpOnly: false, 
            expires: new Date(Date.now() + (rTa_Exp_Hrs * 3600000))
        });

        //Saving log
        const update = await AccInfo.findOneAndUpdate({username: username}, {
            log_1: Date.now(),
            log_2: user.log_1,
            log_3: user.log_2
        }, {new: true});

        console.log("Logs updated", update);

        console.log(`User ${username} Logged In`);
        return res.status(200).json({
            message: 'Successful Login',
            auth: true
        });  

    }catch(err){
        console.log(`Failed to Login User\n${err}`);
        res.status(500).send({
            message: 'Login Failed',
            error: err.message
        });
    }    
});

//Access Token
router.post('/token', async (req, res) => {
    const refreshToken = req.body.token,
            refreshSecret = process.env.REFRESH_TOKEN_SECRET;
    if(!refreshToken) {
        
        console.log('No Token in Header');
        response.status(401).send({
            message: 'No Token in Header'
        });
    }

    TokenInfo.findOne({token: refreshToken}).then((entry) => {
        if(!entry) {
            console.log('Token Expired');
            res.status(403).send({
                message: 'Token Expired, Login again',
                auth: false
            });
        } else {
            jwt.verify(refreshToken, refreshSecret, (err, tokenObj) => {
                if(err) {
                    console.log('Invalid Token');
                    res.status(403).send({
                        message: 'Invalid Token',
                        auth: false
                    });
                } else {
                    const accessToken = jwt.sign(tokenObj, accessSecret, {expiresIn: '15s'});
                    console.log(`Access Token Created ${accessToken}`);
                    res.status(403).send({
                        message: 'Access Token Created',
                        auth: true,
                        accessToken: accessToken
                    });
                }
            });
        }
    }).catch((err) => {
        console.log(`Failed to retrieve token data\n${err}`);
        response.status(500).send({
            message: 'Failed to retrieve token data',
            error: err.message
        });
    });
});

router.delete('/token', async (req, res) => {
    console.log("Deleting all tokens");
    await TokenInfo.deleteMany({}).then((entry) => {
        console.log("All entries deleted", entry);
        res.status(403).send({
            message: 'All Entries Delted',
            deletedCount: entry.deletedCount
        });
    }).catch((err) => {
        console.log("Could not delete tokens");
        res.status(403).send({
            message: 'Entries not deleted',
            error: err
        });
    })
    
})

//Logout
router.delete('/logout', async (req, res) => {

});

export default router