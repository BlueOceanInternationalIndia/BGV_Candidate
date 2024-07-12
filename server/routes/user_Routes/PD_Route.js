import express from "express";
import { PD } from "../../models/user_models/PD_Model.js";
import { Log } from "../../models/user_models/log_Model.js";

const router = express.Router();

router.post('/', async (req, res) => {
    if( req.body.uid == null ||
        req.body.id == null ||
        req.body.user == null ||
        req.body.fullName == null ||
        req.body.fatherName == null ||
        req.body.motherName == null ||
        req.body.spouseName == null ||
        req.body.gender == null ||
        req.body.dob == null ||
        req.body.contact == null ||
        req.body.whatsapp == null ||
        req.body.email == null ||
        req.body.altEmail == null ||
        req.body.stateResi == null ||
        req.body.placeResi == null ||
        req.body.nationality == null ||
        req.body.highestQual == null ||
        req.body.image == null 
    ) {
        return res.status(400).send({
            message: 'Input fields missing. Invalid request'
        });
    }

    await PD.create(req.body).then(async (entry) => {
        console.log(`New Entry Created in Candidate Personal Details\n${entry}`);

        //Updating Logs
        const resp = await Log.findOneAndUpdate({uid: req.body.uid}, {form1: {enabled: true, form: true, file1: req.body.image}}, {new: true});
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

// router.put('/', async (req, res) => {
//     if( req.body.uid == null ||
//         req.body.id == null ||
//         req.body.user == null ||
//         req.body.fullName == null ||
//         req.body.fatherName == null ||
//         req.body.motherName == null ||
//         req.body.spouseName == null ||
//         req.body.gender == null ||
//         req.body.dob == null ||
//         req.body.contact == null ||
//         req.body.whatsapp == null ||
//         req.body.email == null ||
//         req.body.altEmail == null ||
//         req.body.stateResi == null ||
//         req.body.placeResi == null ||
//         req.body.nationality == null ||
//         req.body.highestQual == null ||
//         req.body.image == null 
//     ) {
//         return res.status(400).send({
//             message: 'Input fields missing. Invalid request'
//         });
//     }

//     await PD.findOneAndUpdate({uid: req.body.uid}, req.body, {new: true}).then(async (entry) => {
//         console.log(`Entry Updated in Candidate Personal Details\n${entry}`);
//         return res.status(201).send({
//             message: `Entry Updated`,
//             data: entry
//         });
//     }).catch((err) => {
//         console.log('Database Connection Failed', err);
//         return res.status(500).send({
//             message: 'Database Connection Failed',
//             data: err
//         });
//     });
// });

router.get('/:uid', async (req, res) => {
    const {uid} = req.params;

    try {
        console.log('Retrieving Personal Details');
        const data = await PD.findOne({uid: uid});

        console.log(`Personal Details for ${uid} sent`);
        return res.status(200).json({
            message: 'Personal Details Sent',
            data: data
        }
        );
    }
    catch(err) {
        console.log(`Failed to get Personal Details\n${err}`);
        res.status(500).send({
            message: 'Failed to get Personal Details',
            error: err
        });
    }
});

export default router