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
        form0: {
            enabled: {
                type: Boolean,
                required: true
            },
            form: {
                type: Boolean,
                required: true
            }
        },
        form1: {
            enabled: {
                type: Boolean,
                required: true
            },
            form: {
                type: Boolean,
                required: true
            },
            file1: {
                type: Boolean,
                required: true
            }
        },
        form2: {
            enabled: {
                type: Boolean,
                required: true
            },
            form: {
                type: Boolean,
                required: true
            }
        },
        form3: {
            enabled: {
                type: Boolean,
                required: true
            },
            form: {
                type: Boolean,
                required: true
            }
        },
        form4: {
            enabled: {
                type: Boolean,
                required: true
            },
            form: {
                type: Boolean,
                required: true
            }
        },
        form5: {
            enabled: {
                type: Boolean,
                required: true
            },
            form: {
                type: Boolean,
                required: true
            }
        },
        form6: {
            enabled: {
                type: Boolean,
                required: true
            },
            form: {
                type: Boolean,
                required: true
            }
        },
        form7: {
            enabled: {
                type: Boolean,
                required: true
            },
            form: {
                type: Boolean,
                required: true
            }
        },
        form8: {
            enabled: {
                type: Boolean,
                required: true
            },
            form: {
                type: Boolean,
                required: true
            }
        }
    },
    //For saving date and time of creation and last update
    {
        timestamps: true
    }
);

export const Log = mongoose.model('Candidate_Log', Log_Schema);