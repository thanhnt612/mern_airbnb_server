import mongoose from "mongoose";
const { Schema } = mongoose;

const bookingSchema = new Schema({
    placeId: String,
    guestId: String,
    checkIn: {
        type: Date,
        require: true
    },
    checkOut: {
        type: Date,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    numberOfGuest: Number,
    price: Number
})
export const Booking = mongoose.model("Booking", bookingSchema)