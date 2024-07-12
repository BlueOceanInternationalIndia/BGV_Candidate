import mongoose, { Schema } from 'mongoose';

const AV_Schema = new Schema(
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
        curr_address: {
            type: String,
            required: true
        },
        curr_city: {
            type: String,
            required: true
        },
        curr_district: {
            type: String,
            required: true
        },
        curr_state: {
            type: String,
            required: true
        },
        curr_pincode: {
            type: Number,
            required: true
        },
        curr_stay: {
            type: Date,
            required: true
        },
        curr_post: {
            type: String,
            required: true
        },
        curr_police: {
            type: String,
            required: true
        },
        curr_owner: {
            type: String,
            required: true
        },
        curr_type: {
            type: String,
            required: true
        },
        curr_location: {
            type: String,
            required: true
        },
        per_address: {
            type: String,
            required: true
        },
        per_city: {
            type: String,
            required: true
        },
        per_district: {
            type: String,
            required: true
        },
        per_state: {
            type: String,
            required: true
        },
        per_pincode: {
            type: Number,
            required: true
        },
        per_stay: {
            type: Date,
            required: true
        },
        per_post: {
            type: String,
            required: true
        },
        per_police: {
            type: String,
            required: true
        },
        per_owner: {
            type: String,
            required: true
        },
        per_type: {
            type: String,
            required: true
        },
        per_location: {
            type: String,
            required: true
        }
    },
    //For saving date and time of creation and last update
    {
        timestamps: true
    }
);

export const AV = mongoose.model('Candidate_AddressDetails', AV_Schema);