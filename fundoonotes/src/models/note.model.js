import { Schema, model } from "mongoose";

const userSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    color: {
        type: String,

    },
    isArchived: {
        default: false
    },
    isDeleted: {
        default: false
    },
    createdBy: {
        type: String
    }
},
    {
        timestamps: true
    });

export default model("Note", userSchema)