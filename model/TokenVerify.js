import mongoose from "mongoose";
const { Schema } = mongoose;
const DOCUMENT_NAME = 'verify'
const COLLECTION_NAME = 'verifies'
const tokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    token:{
        type:String
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});
export const Token = mongoose.model(DOCUMENT_NAME, tokenSchema);