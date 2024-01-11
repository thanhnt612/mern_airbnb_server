import { User } from "../model/UserModel.js";
import { Place } from "../model/PlaceModel.js";
import { Booking } from "../model/BookingModel.js";
import { Blog } from "../model/BlogModel.js";

export const getUserDashboardService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const getAllUser = await User.find();
            resolve({
                status: 200,
                content: getAllUser,
            });
        } catch (error) {
            reject({
                status: 400,
                message: error,
            });
        }
    });
};

export const getPlaceDashboardService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const getAllRoom = await Place.find();
            resolve({
                status: 200,
                content: getAllRoom,
            });
        } catch (error) {
            reject({
                status: 400,
                message: error,
            });
        }
    });
};

export const getBookingDashboardService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const getAllBooking = await Booking.find()
                .populate(
                    'placeId',
                    'title address description photos perks -_id'
                );
            resolve({
                status: 200,
                content: getAllBooking
            })
        } catch (error) {
            reject({
                status: 400,
                message: error
            })
        }
    })
}

export const getBlogDashboardService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const getAllBlog = await Blog.find()
            resolve({
                status: 200,
                content: getAllBlog
            })
        } catch (error) {
            reject({
                status: 400,
                message: error
            })
        }
    })
}