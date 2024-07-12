import mongoose, { Schema } from 'mongoose';

const EduV_Higher_Schema = new Schema(
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
        university: {
            type: String,
            required: true
        },
        college: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        commence: {
            type: Date,
            required: true
        },
        completion: {
            type: Date,
            required: true
        },
        degree: {
            type: String,
            required: true
        },
        discipline: {
            type: String,
            required: true
        },
        stream: {
            type: String,
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

export const EduV_Higher = mongoose.model('Candidate_EducationDetails_Higher', EduV_Higher_Schema);