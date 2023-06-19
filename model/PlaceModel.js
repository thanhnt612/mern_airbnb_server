import mongoose from "mongoose";
const { Schema } = mongoose;

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
    price: Number
});
placeSchema.index({address: 'text'});
export const Place = mongoose.model("Place", placeSchema);