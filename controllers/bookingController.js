import {
    bookingRoomService,
    getBookingGuestService
} from "../services/bookingService.js";

export const bookingRoomController = async (req, res) => {
    const {
        placeId, guestId, name, checkIn, phone,
        checkOut, numberOfGuest, price
    } = req.body
    if (placeId && guestId && name && phone && checkIn
        && checkOut && numberOfGuest && price) {
        const response = await bookingRoomService({
            placeId, guestId, name, phone, checkIn,
            checkOut, numberOfGuest, price
        });
        return res.json(response);
    } else {
        return res.json({
            status: 400,
            message: "Data is require",
        });
    }
};
export const getBookingGuestController = async (req, res) => {
    try {
        const { guestId } = req.params;
        if (guestId) {
            const response = await getBookingGuestService(guestId);
            return res.json(response)
        }
        return res.json({
            status: 400,
            message: "The GuestId is require"
        })
    } catch (error) {
        return res.json({
            status: "error",
            message: error
        })
    }
}
