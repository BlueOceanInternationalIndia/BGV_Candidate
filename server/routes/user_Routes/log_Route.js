import 'dotenv/config';
import express from "express";
import { Log } from '../../models/user_models/log_Model.js';

const router = express.Router();

router.post('/', async (req, res) => {
    console.log(req.body, req.body.form0.form);
    try{
        //Validate the input
        if( req.body.uid == null ||
            req.body.id == null ||
            req.body.user == null ||
            req.body.form0.enabled == null ||
            req.body.form0.form == null ||
            req.body.form1.enabled == null ||
            req.body.form1.form == null ||
            req.body.form1.file1 == null ||
            req.body.form2.enabled == null ||
            req.body.form2.form == null ||
            req.body.form3.enabled == null ||
            req.body.form3.form == null ||
            req.body.form4.enabled == null ||
            req.body.form4.form == null ||
            req.body.form5.enabled == null ||
            req.body.form5.form == null ||
            req.body.form6.enabled == null ||
            req.body.form6.form == null ||
            req.body.form7.enabled == null ||
            req.body.form7.form == null ||
            req.body.form8.enabled == null ||
            req.body.form8.form == null
        ) {
            return res.status(400).send({
                message: 'Input fields missing. Invalid request',
            });
        }

        //Defining a new entry
        // const newEntry = {
        //     uid: req.body.uid,
        //     id: req.body.id,
        //     user: req.body.user,
        //     form0: {
        //         enabled: req.body.form0.enabled,
        //         form: req.body.form0.form
        //     },
        //     form1: {
        //         enabled: req.body.form1.enabled,
        //         form: req.body.form1.form,
        //         file1: req.body.form1.file1
        //     },
        //     form2: {
        //         enabled: req.body.form2.enabled,
        //         form: req.body.form2.form
        //     },
        //     form3: {
        //         enabled: req.body.form3.enabled,
        //         form: req.body.form3.form
        //     },
        //     form4: {
        //         enabled: req.body.form4.enabled,
        //         form: req.body.form4.form
        //     },
        //     form5: {
        //         enabled: req.body.form5.enabled,
        //         form: req.body.form5.form
        //     },
        //     form6: {
        //         enabled: req.body.form6.enabled,
        //         form: req.body.form6.form
        //     },
        //     form7: {
        //         enabled: req.body.form7.enabled,
        //         form: req.body.form7.form
        //     },
        //     form8: {
        //         enabled: req.body.form8.enabled,
        //         form: req.body.form8.form
        //     }
        // }

        //Creating a new entry
        const entry = await Log.create(req.body);

        console.log(`New Candidate Log Created\n${entry}`);
        return res.status(201).send({
            message: `New Log Entry Created`,
            data: entry
        });
    } 
    catch(err) {
        console.log(`Failed to Create Log\n${err}`);
        res.status(500).send({
            message: 'Failed to Create Log',
            error: err.message
        });   
    }
});

router.get('/:uid', async (req, res) => {
    try {
        //getting id from request
        const {uid} = req.params;

        console.log('Retrieving Log');
        const log = await Log.findOne({uid: uid});

        console.log(`Log for ${uid} sent`);
        return res.status(200).json({
            message: 'Log Sent',
            log: log
        }
        );
    }
    catch(err) {
        console.log(`Failed to get Log\n${err}`);
        res.status(500).send({
            message: 'Failed to get Log',
            error: err.message
        });
    }
});

export default router