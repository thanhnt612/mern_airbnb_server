import mongoose from "mongoose";
const { Schema } = mongoose;
const DOCUMENT_NAME = 'place'
const COLLECTION_NAME = 'places'
const placeSchema = new Schema({
    owner: String,
    title: {
        type: String,
        require: true,
        unique: true,
    },
    address: String,
    photos: [String],
    description: {
        type: String,
        require: true,
        unique: true,
    },
    perks: [String],
    checkIn: Number,
    checkOut: Number,
    maxGuest: Number,
    price: Number,
    available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});
placeSchema.index({ address: 'text' });
export const Place = mongoose.model(DOCUMENT_NAME, placeSchema);