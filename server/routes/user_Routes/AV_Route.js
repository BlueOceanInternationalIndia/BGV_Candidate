import express from "express";
import { AV } from "../../models/user_models/AV_Model.js";
import { Log } from "../../models/user_models/log_Model.js";

const router = express.Router();

router.post('/', async (req, res) => {
    if( req.body.uid == null ||
        req.body.id == null ||
        req.body.user == null ||
        req.body.curr_address == null ||
        req.body.curr_city == null ||
        req.body.curr_district == null ||
        req.body.curr_state == null ||
        req.body.curr_pincode == null ||
        req.body.curr_stay == null ||
        req.body.curr_post == null ||
        req.body.curr_police == null ||
        req.body.curr_owner == null ||
        req.body.curr_type == null ||
        req.body.curr_location == null ||
        req.body.per_address == null ||
        req.body.per_city == null ||
        req.body.per_district == null ||
        req.body.per_state == null ||
        req.body.per_pincode == null ||
        req.body.per_stay == null ||
        req.body.per_post == null ||
        req.body.per_police == null ||
        req.body.per_owner == null ||
        req.body.per_type == null ||
        req.body.per_location == null
    ) {
        return res.status(400).send({
            message: 'Input fields missing. Invalid request'
        });
    }

    await AV.create(req.body).then(async (entry) => {
        console.log(`New Entry Created in Candidate Address Details\n${entry}`);

        //Updating Logs
        const resp = await Log.findOneAndUpdate({uid: req.body.uid}, {form2: {enabled: true, form : true}}, {new: true});
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
//         req.body.curr_address == null ||
//         req.body.curr_city == null ||
//         req.body.curr_district == null ||
//         req.body.curr_state == null ||
//         req.body.curr_pincode == null ||
//         req.body.curr_stay == null ||
//         req.body.curr_post == null ||
//         req.body.curr_police == null ||
//         req.body.curr_owner == null ||
//         req.body.curr_type == null ||
//         req.body.curr_location == null ||
//         req.body.per_address == null ||
//         req.body.per_city == null ||
//         req.body.per_district == null ||
//         req.body.per_state == null ||
//         req.body.per_pincode == null ||
//         req.body.per_stay == null ||
//         req.body.per_post == null ||
//         req.body.per_police == null ||
//         req.body.per_owner == null ||
//         req.body.per_type == null ||
//         req.body.per_location == null
//     ) {
//         return res.status(400).send({
//             message: 'Input fields missing. Invalid request'
//         });
//     }

//     await AV.findOneAndUpdate({uid: req.body.uid}, req.body, {new: true}).then(async (entry) => {
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
        console.log('Retrieving Address Details');
        const data = await AV.findOne({uid: uid});

        console.log(`Address Details for ${uid} sent`);
        return res.status(200).json({
            message: 'Personal Details Sent',
            data: data
        }
        );
    }
    catch(err) {
        console.log(`Failed to get Address Details\n${err}`);
        res.status(500).send({
            message: 'Failed to get Address Details',
            error: err
        });
    }
});

export default router