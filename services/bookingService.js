import { Booking } from "../model/BookingModel.js";
import { Place } from "../model/PlaceModel.js";

//Process API
export const bookingRoomService = ({ placeId, guestId, name, phone, checkIn,
    checkOut, numberOfGuest, price }) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (guestId) {
                const bookingPlace = await Booking.create({
                    placeId, guestId, name, phone, checkIn,
                    checkOut, numberOfGuest, price
                });
                await Place.findByIdAndUpdate(placeId, { available: false }, { new: true })
                resolve({
                    status: 200,
                    message: "Create Room Success !!!",
                    data: {
                        bookingPlace
                    },
                });
            } else {
                resolve({
                    status: 402,
                    message: "please login to your account",
                });
            }
        } catch (error) {
            reject({
                message: error,
                status: 403,
            });
        }
    }).catch((e) => console.log(e));
};
export const getBookingGuestService = (guestId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const findBooking = await Booking.find({ "guestId": guestId })
                .populate(
                    'placeId',
                    '_id available title address description photos perks'
                );
            if (findBooking) {
                resolve({
                    status: 200,
                    content: findBooking
                })
            }
            resolve({
                status: 204,
                message: "FindBooking is not defined"
            })
        } catch (error) {
            reject({
                message: error,
                status: 400
            })
        }
    }).catch((e) => console.log(e));
}
export const deleteBookingService = (id, place) => {
    return new Promise(async (resolve, reject) => {
        try {
            const deleteBooking = await Booking.findByIdAndDelete(id);
            await Place.findByIdAndUpdate(place, { available: true }, { new: true })
            if (deleteBooking) {
                resolve({
                    status: 200,
                    content: 'Booking Deleted'
                })
            } else {
                resolve({
                    status: 204,
                    content: "The Booking is not defined",
                });
            }
        } catch (error) {
            reject({
                status: 400,
                massage: error,
            });
        }
    })
}