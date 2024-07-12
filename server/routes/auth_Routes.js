import 'dotenv/config';
import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AccInfo } from "../models/admin_models/account_Model.js";
import { TokenInfo } from '../models/admin_models/token_Model.js';
import rTa_Verify from '../middleware/rTa_Verify.js';

const router = express.Router();


//-------------------Routes-----------------------
//Home Page
// router.get('/', (req, res) => { 
//     return res.status(234).send('Auth Server Setup Complete');
// });

//User Authentication
router.post('/auth', async (req, res) => {
    try{
        const username = req.body.user_name__,
            password = req.body.pass_word__;

        console.log(`Authenticating Login for ${username}`);
        const user = await AccInfo.findOne({username: username});
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
        const tokenObj = {
                uid: user._id,
                id: user.id,
                user : user.name
            },
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
        const returnData = {
            id : user.id,
            name: user.name,
            email: user.email,
            username: user.username,
        }
        return res.status(200).json({
            message: 'Successful Login',
            auth: true,
            user: returnData
        });  

    }catch(err){
        console.log(`Failed to Login User\n${err}`);
        res.status(500).send({
            message: 'Login Failed',
            auth: false,
            error: err.message
        });
    }    
});

//Login Validation
router.post('/valid', rTa_Verify, async (req, res) => {
    const authHeader = req.body.auth;
    const token = authHeader && authHeader.split(' ')[1];
    // console.log("Token -> ", token);

    if(req.valid == false) {
        TokenInfo.findOneAndDelete({token: token}).then((resp) => {
            console.log('Token Invalid');

            res.clearCookie('rTa');
            res.clearCookie('aTr');

            return res.status(200).send({
                message: 'Token Invalid',
                auth: false
            })
        })
    } else {
        //Finding Token
        TokenInfo.findOne({token: token}).then((resp) => {
            if(resp == null) {
                console.log('Invalid Token');
                return res.status(200).send({
                    message: 'Invalid Session',
                    auth: false
                })
            } else {
                // console.log('User Verified', resp.body);
                const returnData = {
                    uid: req.user.uid,
                    id: req.user.id,
                    name: req.user.name
                }
                return res.status(200).send({
                    message: 'User Verified',
                    auth: true,
                    user: returnData
                })
            }
        }).catch((err) => {
            console.log('Database Connection Error', err);
            return res.status(500).send({
                message: 'Database Connection Error',
                auth: false
            })
        })
        
    }
})

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

//Logout
router.post('/logout', async (req, res) => {
    const authHeader = req.body.auth;
    const token = authHeader && authHeader.split(' ')[1];
    // console.log("Token -> ", token);

    TokenInfo.findOneAndDelete({token: token}).then((resp) => {
        if(resp == null) {
            console.log('Invalid Session');

            res.clearCookie('rTa');
            res.clearCookie('aTr');

            return res.status(200).send({
                message: 'Invalid Session',
                auth: false
            })
        } else {
            console.log('User Logged Out');
            
            try{
                res.clearCookie('rTa');
                res.clearCookie('aTr');
            }catch(err){
                console.log('error deleteing cookie', err);
            }
            

            return res.status(200).send({
                message: 'User Logged Out',
                auth: false
            })
            }
    }).catch((err) => {
        console.log('Error Logging Out');
        return res.status(500).send({
            message: 'Error Logging Out',
            auth: true
        })
    });
});

//Clear Token List
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

export default router