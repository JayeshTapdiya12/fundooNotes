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
        type: String
    },
    isArchived: {
        type: Boolean
    },
    isDeleted: {
        type: Boolean
    },
    userId: {
        type: String
    },
    createdBy: {
        type: String
    }
},
    {
        timestamps: true
    });

export default model("Note", userSchema)