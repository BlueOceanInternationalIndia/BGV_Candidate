import 'dotenv/config';
import express from "express";
import { Consent } from '../../models/user_models/consent_Model.js'
import { Log } from '../../models/user_models/log_Model.js';

const router = express.Router();

router.post('/', async (req, res) => {
    if( req.body.uid == null ||
        req.body.id == null ||
        req.body.user == null ||
        req.body.consent == null 
    ) {
        return res.status(400).send({
            message: 'Input fields missing. Invalid request'
        });
    }

    await Consent.create(req.body).then(async (entry) => {
        console.log(`New Entry Created in Candidate Consent\n${entry}`);

        //Updating Logs
        const resp = await Log.findOneAndUpdate({uid: req.body.uid}, {form0:{enabled: true, form: true}}, {new: true});
        if(resp == null) {
            console.log('User Logs Not Updated', resp);
            return res.status(500).send({
                error: 'User logs not updated'
            })
        } else {
            console.log('User Logs Updated', resp);
        }

        return res.status(201).send({
            message: `New Entry Created`,
            data: entry
        });
    }).catch((err) => {
        console.log('Database Connection Failed', err);
        return res.status(500).send({
            message: 'Database Connection Failed',
            data: err
        });
    });
});

export default router