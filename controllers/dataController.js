import { 
    getBlogDataService, 
    getBookingDataService, 
    getPlaceDataService, 
    getUserDataService 
} from "../services/dataService.js";

export const getUserDataController = async (req, res) => {
    try {
        const response = await getUserDataService();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            status: "error",
            message: error,
        });
    }
}

export const getPlaceDataController = async (req, res) => {
    try {
        const response = await getPlaceDataService();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500)
    }
};

export const getBookingDataController = async (req, res) => {
    try {
        const response = await getBookingDataService();
        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
        return res.status(500)
    }
}

export const getBlogDataController = async (req, res) => {
    try {
        const response = await getBlogDataService()
        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
        return res.status(500)
    }
}