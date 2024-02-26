import {
    createRoomService,
    getAllRoomService,
    detailRoomService,
    OwnerRoomService,
    updateRoomService,
    destinationService,
    checkStatusRoomService
} from "../services/placeService.js"

export const createRoomController = async (req, res) => {
    const {
        owner, title, address, addPhoto,
        description, perk, checkIn,
        checkOut, maxGuest, price
    } = req.body
    if (owner && title && address && addPhoto
        && title && description && perk && checkIn
        && checkOut && maxGuest && price) {
        const response = await createRoomService({
            owner, title, address, addPhoto,
            description, perk, checkIn,
            checkOut, maxGuest, price
        });
        return res.json(response);
    } else {
        return res.json({
            status: 400,
            message: "Data is require",
        });
    }
};
export const getAllRoomController = async (req, res) => {
    try {
        const response = await getAllRoomService();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500)
    }
};

export const checkStatusRoomController = async (req, res) => {
    try {
        const response = await checkStatusRoomService();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500)
    }
}

export const detailRoomController = async (req, res) => {
    try {
        const { roomId } = req.params;
        if (roomId) {
            const response = await detailRoomService(roomId);
            return res.json(response);
        }
        return res.json({
            status: 400,
            message: "The id is require",
        });
    } catch (err) {
        console.log(err);
        return res.json({
            status: "err",
            message: err,
        });
    }
};
export const OwnerRoomController = async (req, res) => {
    try {
        const { ownerId } = req.params;
        if (ownerId) {
            const response = await OwnerRoomService(ownerId);
            return res.json(response);
        }
        return res.json({
            status: 400,
            message: "The owner is require",
        });
    } catch (err) {
        console.log(err);
        return res.json({
            status: "err",
            message: err,
        });
    }
};
export const updateRoomController = async (req, res) => {
    try {
        const { roomId } = req.params;
        const {
            owner, title, address, addPhoto,
            description, perk, checkIn,
            checkOut, maxGuest, price
        } = req.body
        if (roomId) {
            const response = await updateRoomService(
                roomId, owner, title, address, addPhoto,
                description, perk, checkIn,
                checkOut, maxGuest, price
            );
            if (response) {
                return res.json(response);
            } else {
                return res.json({
                    status: 400,
                    message: "The server is problem",
                });
            }
        } else {
            return res.json({
                status: 401,
                message: "The id is required",
            });
        }
    } catch (error) {
        return res.json({
            status: 400,
            message: error,
        });
    }
};
export const destinationController = async (req, res) => {
    try {
        const { dest } = req.params;
        if (dest) {
            const response = await destinationService(dest);
            return res.json(response);
        }
        return res.json({
            status: 400,
            message: "Destination is require",
        });
    } catch (err) {
        return res.json({
            status: "err",
            message: err,
        });
    }
};
export const uploadImagePlace = async (req, res) => {
    const uploadImages = []
    for (let i = 0; i < req.files.length; i++) {
        const { path } = req.files[i]
        uploadImages.push(path);
    }
    res.status(200).json({
        message: 'upload success',
        content: uploadImages
    })
}