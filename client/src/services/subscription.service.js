import API from "../api/axios";

// Activate FREE Read Recipe plan
export const activateFreePlan = async () => {
    const response = await API.post(
        "/subscription/free"
    );

    return response.data;
};


// Get current subscription
export const getSubscription = async () => {
    const response = await API.get(
        "/subscription"
    );

    return response.data;
};