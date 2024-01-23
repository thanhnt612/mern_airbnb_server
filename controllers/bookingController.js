import {
    bookingRoomService,
    deleteBookingService,
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
export const deleteBookingController = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const place = data.place
        if (id && place) {
            const response = await deleteBookingService(id, place);
            return res.json(response)
        } else {
            return res.status(400).json({
                message: 'The booingId is required'
            })
        }
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
}