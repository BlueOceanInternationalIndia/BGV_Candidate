import express from "express";
import { IV } from "../../models/user_models/IV_Model.js";
import { Log } from "../../models/user_models/log_Model.js";

const router = express.Router();

router.post('/', async (req, res) => {
    if( req.body.uid == null ||
        req.body.id == null ||
        req.body.user == null ||
        req.body.adhaar == null ||
        req.body.adhaar_mobile == null ||
        req.body.pan == null ||
        req.body.pan_mobile == null
    ) {
        return res.status(400).send({
            message: 'Input fields missing. Invalid request'
        });
    }

    await IV.create(req.body).then(async (entry) => {
        console.log(`New Entry Created in Candidate Identity Details\n${entry}`);

        //Updating Logs
        const resp = await Log.findOneAndUpdate({uid: req.body.uid}, {form_3: true}, {new: true});
        console.log('User Logs Updated', resp);

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

router.put('/', async (req, res) => {
    if( req.body.uid == null ||
        req.body.id == null ||
        req.body.user == null ||
        req.body.adhaar == null ||
        req.body.adhaar_mobile == null ||
        req.body.pan == null ||
        req.body.pan_mobile == null
    ) {
        return res.status(400).send({
            message: 'Input fields missing. Invalid request'
        });
    }

    await IV.findOneAndUpdate({uid: req.body.uid}, req.body, {new: true}).then(async (entry) => {
        console.log(`Entry Updated in Candidate Identity Details\n${entry}`);
        return res.status(201).send({
            message: `Entry Updated`,
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