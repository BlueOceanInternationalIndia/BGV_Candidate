import mongoose, { Schema } from 'mongoose';

const Log_Schema = new Schema(
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
        form_0: {
            type: Boolean,
            required: true
        },
        form_1: {
            type: Boolean,
            required: true
        },
        form_2: {
            type: Boolean,
            required: true
        },
        form_3: {
            type: Boolean,
            required: true
        },
        form_4: {
            type: Boolean,
            required: true
        },
        form_5: {
            type: Boolean,
            required: true
        },
        form_6: {
            type: Boolean,
            required: true
        },
        form_7: {
            type: Boolean,
            required: true
        },
        form_8: {
            type: Boolean,
            required: true
        }
    },
    //For saving date and time of creation and last update
    {
        timestamps: true
    }
);

export const Log = mongoose.model('Candidate_Log', Log_Schema);