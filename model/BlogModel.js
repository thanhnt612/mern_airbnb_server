import mongoose from "mongoose";
const { Schema } = mongoose;

const blogSchema = new Schema({
    author: String,
    title: {
        type: String,
        require: true,
        unique: true
    },
    article: {
        type: String,
        require: true,
        unique: true,
    },
    photos: [String],
},
    {
        timestamps: true,
    }
);
export const Blog = mongoose.model("Blog", blogSchema);