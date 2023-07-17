import mongoose, {Schema, model, models } from "mongoose";

const testSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    testCases: {
        type: [
            {
                input: String,
                output: { type: String, required: true },
            }
        ],
        required: true,
    },
})

const Test = models.Test || model('Test', testSchema);

export default Test;