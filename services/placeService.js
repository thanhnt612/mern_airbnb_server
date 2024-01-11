import { Booking } from "../model/BookingModel.js";
import { Place } from "../model/PlaceModel.js";
import cron from 'node-cron'

//Process API
export const createRoomService = ({ owner, title, address,
    addPhoto, description, perk, checkIn, checkOut, maxGuest, price }) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (owner) {
                const isCheckTitle = await Place.find({ title: title });
                const isCheckDescription = await Place.find({ description: description });
                if (isCheckTitle.length || isCheckDescription.length) {
                    resolve({
                        status: 401,
                        message: "Information is existed",
                    });
                }
                const newPlace = await Place.create({
                    owner, title, address, photos: addPhoto,
                    description, perks: perk, checkIn,
                    checkOut, maxGuest, price
                });
                resolve({
                    status: 200,
                    message: "Create Room Success !!!",
                    data: {
                        newPlace
                    }
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
export const getAllRoomService = () => {
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

export const checkStatusRoomService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const job = cron.schedule('1 * * * *', async () => {
                const findBooking = await Booking.find()
                for (let i = 0; i < findBooking.length; i++) {
                    const element = findBooking[i];
                    const currentDate = new Date();
                    const checkoutDate = new Date(element.checkOut)
                    if (currentDate > checkoutDate) {
                        await Place.findByIdAndUpdate(element.placeId, { available: true }, { new: true })
                        console.log(`Updated`, i);
                    } else {
                        console.log(`Nothing`, i);
                    }
                }
            }, {
                scheduled: false
            });
            job.start();
        } catch (error) {
            reject({
                status: 400,
                message: error,
            });
        }
    })
}
export const detailRoomService = (roomId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const findRoom = await Place.findById(roomId);
            if (findRoom) {
                resolve({
                    status: 200,
                    content: findRoom,
                });
            }
            resolve({
                status: 204,
                message: "Room is not defined",
            });
        } catch (err) {
            reject({
                message: err,
                status: 400,
            });
        }
    }).catch((e) => console.log(e));
}
export const OwnerRoomService = (ownerId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const findRoom = await Place.find({ "owner": ownerId });
            if (findRoom) {
                resolve({
                    status: 200,
                    content: findRoom,
                });
            }
            resolve({
                status: 204,
                message: "Owner is not defined",
            });
        } catch (err) {
            reject({
                message: err,
                status: 400,
            });
        }
    }).catch((e) => console.log(e));
}
export const updateRoomService = (roomId, owner, title, address,
    addPhoto, description, perk, checkIn, checkOut, maxGuest, price) => {
    return new Promise(async (resolve, reject) => {
        try {
            const placeData = {
                owner, title, address, addPhoto, description,
                perk, checkIn, checkOut, maxGuest, price
            }
            const findRoom = await Place.findById(roomId);
            findRoom.title = placeData.title;
            findRoom.address = placeData.address;
            findRoom.photos = placeData.addPhoto;
            findRoom.description = placeData.description;
            findRoom.perks = placeData.perk;
            findRoom.checkIn = placeData.checkIn;
            findRoom.checkOut = placeData.checkOut;
            findRoom.maxGuest = placeData.maxGuest;
            findRoom.price = placeData.price;
            await findRoom.save();
            if (findRoom) {
                resolve({
                    status: 200,
                    message: "Updated successfully",
                    data: findRoom,
                });
            } else {
                resolve({
                    status: 204,
                    message: "The room is not defined",
                });
            }
        } catch (error) {
            console.log(error);
            reject({
                status: 400,
                massage: error,
            });
        }
    }).catch((e) => console.log(e));
};
export const destinationService = (destination) => {
    return new Promise(async (resolve, reject) => {
        try {
            const findDest = await Place.find({ "address": destination });
            if (findDest) {
                resolve({
                    status: 200,
                    content: findDest,
                });
            }
            resolve({
                status: 204,
                message: "Destination is not defined",
            });
        } catch (err) {
            reject({
                message: err,
                status: 400,
            });
        }
    }).catch((e) => console.log(e));
}
