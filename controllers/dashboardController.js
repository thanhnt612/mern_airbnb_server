import {
    getBlogDashboardService,
    getBookingDashboardService,
    getPlaceDashboardService,
    getUserDashboardService
} from "../services/dashboardService.js";

export const getUserDashboardController = async (req, res) => {
    try {
        const response = await getUserDashboardService();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            status: "error",
            message: error,
        });
    }
}

export const getPlaceDashboardController = async (req, res) => {
    try {
        const response = await getPlaceDashboardService();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500)
    }
};

export const getBookingDashboardController = async (req, res) => {
    try {
        const response = await getBookingDashboardService();
        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
        return res.status(500)
    }
}

export const getBlogDashboardController = async (req, res) => {
    try {
        const response = await getBlogDashboardService()
        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
        return res.status(500)
    }
}