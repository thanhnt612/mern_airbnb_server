import mongoose from "mongoose";
const { Schema } = mongoose;
const DOCUMENT_NAME = 'booking'
const COLLECTION_NAME = 'bookings'
const bookingSchema = new Schema({
    placeId: {
        type: Schema.Types.ObjectId,
        ref: 'place'
    },
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
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})
export const Booking = mongoose.model(DOCUMENT_NAME, bookingSchema)