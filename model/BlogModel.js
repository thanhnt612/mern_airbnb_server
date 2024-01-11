import mongoose from "mongoose";
const { Schema } = mongoose;
const DOCUMENT_NAME = 'blog'
const COLLECTION_NAME = 'blogs'
const blogSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        require: true,
        unique: true
    },
    summary: {
        type: String,
        require: true,
        unique: true,
    },
    mainArticle: {
        type: String,
        require: true,
        unique: true,
    },
    subArticle: {
        type: String,
        require: true,
        unique: true,
    },
    photos: [String],
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});
export const Blog = mongoose.model(DOCUMENT_NAME, blogSchema);