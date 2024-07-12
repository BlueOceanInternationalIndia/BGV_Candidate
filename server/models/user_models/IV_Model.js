import mongoose, { Schema } from 'mongoose';

const IV_Schema = new Schema(
    {
        uid: {
            type: String,
            required: true,
            unique: true
        },
        id: {
            type: Number,
            required: true,
            unique: true
        },
        user: {
            type: String,
            required: true
        },
        adhaar: {
            type: String,
            required: true
        },
        adhaar_mobile: {
            type: String,
            required: true
        },
        pan: {
            type: String,
            required: true
        },
        pan_mobile: {
            type: String,
            required: true
        }
    },
    //For saving date and time of creation and last update
    {
        timestamps: true
    }
);

export const IV = mongoose.model('Candidate_IdentityDetails', IV_Schema);