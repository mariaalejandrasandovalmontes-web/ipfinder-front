import axios from "axios";

const BASE_URL = "https://ipfinder-back-production.up.railway.app";

export const getIps = async (page = 1, query = "") => {
    try {
        const response = await axios.get(`${BASE_URL}/list`, {
            params: {
                per_page: 10,
                page,
                query: query || undefined,
            },
        });

        return response.data;

    } catch (error) {
        console.error("Error en getIps:", error);
        throw error;
    }
};

export const searchIp = async (ip) => {
    try {
        const response = await axios.get(`${BASE_URL}/get`, {
            params: { ip },
        });

        return response.data;

    } catch (error) {
        console.error("Error en searchIp:", error);
        throw error;
    }
};

export const deleteIp = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/remove/${id}`);
        return response.data;

    } catch (error) {
        console.error("Error en deleteIp:", error);
        throw error;
    }
};