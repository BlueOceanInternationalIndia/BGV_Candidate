import express from "express"
import { Log } from "../../models/user_models/log_Model.js"
import upload from '../../middleware/multer.js'
import { Storage } from '@google-cloud/storage'

//Connecting to Cloud Storage
const storage = new Storage({
    projectId: 'blue-ocean-bgv',
    keyFilename: './credentials/BlueOceanInternationalIndia_BGV.json'
})

const bucketName = 'blueoceaninternationalindia_bgv_bucket'
const bucket = storage.bucket(bucketName);

const router = express.Router();

// router.get('/', (req, res) => { return res.status(234).send('Server Setup Complete')})

router.post('/upload',upload.single('File'), async (req, res) => {
    console.log("Body ->",req.body,"\nFile ->", req.file);

    const fileName = req.body.uid + '_' + req.body.id + '_' + req.body.user + '_' + req.body.filename + '_' + req.file.originalname;

    try {
        const BLOB = bucket.file(fileName);
        const BLOB_Stream = BLOB.createWriteStream()

        BLOB_Stream.on('error', (err) => {
            console.log("BLOB Stream Error", err);
            return res.status(500),send({
                error: err,
                success: false
            })
        })

        BLOB_Stream.on('finish', async () => {
            console.log("BLOB stream upload complete");
            //Updating Logs
            const resp = await Log.findOneAndUpdate({uid: req.body.uid}, {form1: {enabled: true, form: req.body.form1, file1: true}}, {new: true});
            console.log('User Logs Updated', resp);
            return res.status(200).send({
                message: 'File Upload Successful',
                success: true
            });
        })
        
        BLOB_Stream.end(req.file.buffer)
        
    } catch (err) {
        console.log("BLOB Stream Upload Error");
        return res.status(500).send({
            error: err,
            success: false
        })
        
    }
})
    
export default router