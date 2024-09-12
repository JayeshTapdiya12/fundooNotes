import { optional } from "@hapi/joi";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    color: {
        type: String,
        // optional
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
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