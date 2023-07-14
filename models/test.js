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
    // posts: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Post',
    //     }
    // ],
    // // user id to grade
    // grades: {
    //     type: Map,
    //     // of: Number,
    //     required: true,
    // },
})

const Test = models.Test || model('Test', testSchema);

export default Test;