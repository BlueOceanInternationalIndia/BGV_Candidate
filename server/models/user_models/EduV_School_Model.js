import mongoose, { Schema } from 'mongoose';

const EduV_School_Schema = new Schema(
    {
        uid: {
            type: String,
            required: true,
        },
        id: {
            type: Number,
            required: true,
        },
        user: {
            type: String,
            required: true
        },
        level: {
            type: String,
            required: true
        },
        board: {
            type: String,
            required: true
        },
        school: {
            type: String,
            required: true
        },
        completion: {
            type: Date,
            required: true
        },
        max: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        },
        percent: {
            type: Number,
            required: true
        }
        
    },
    //For saving date and time of creation and last update
    {
        timestamps: true
    }
);

export const EduV_School = mongoose.model('Candidate_EducationDetails_School', EduV_School_Schema);