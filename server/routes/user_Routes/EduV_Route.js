import express from "express";
import { EduV_School } from "../../models/user_models/EduV_School_Model.js";
import { EduV_Higher } from "../../models/user_models/EduV_Higher_Model.js";
import { Log } from "../../models/user_models/log_Model.js";

const router = express.Router();

router.post('/school', async (req, res) => {
    if( req.body.uid == null ||
        req.body.id == null ||
        req.body.user == null ||
        req.body.level == null ||
        req.body.board == null ||
        req.body.school == null ||
        req.body.completion == null ||
        req.body.max == null ||
        req.body.total == null ||
        percent == null
    ) {
        return res.status(400).send({
            message: 'Input fields missing. Invalid request'
        });
    }

    await EduV_School.create(req.body).then(async (entry) => {
        console.log(`New Entry Created in School Education Details\n${entry}`);

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

router.post('/higher', async (req, res) => {
    if( req.body.uid == null ||
        req.body.id == null ||
        req.body.user == null ||
        req.body.level == null ||
        req.body.university == null ||
        req.body.college == null ||
        req.body.state == null ||
        req.body.Duration == null ||
        req.body.commence == null ||
        req.body.completion == null ||
        req.body.degree == null ||
        req.body.discipline == null ||
        req.body.stream == null ||
        req.body.max == null ||
        req.body.total == null ||
        req.body.percent == null
    ) {
        return res.status(400).send({
            message: 'Input fields missing. Invalid request'
        });
    }

    await EduV_Higher.create(req.body).then(async (entry) => {
        console.log(`New Entry Created in Higher Education Details\n${entry}`);

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


router.post('/log', async (req, res) => {
    const resp = await Log.findOneAndUpdate({uid: req.body.uid}, {form_5: true}, {new: true});
    console.log('User Logs Updated', resp);
});
//Updating Logs


export default router