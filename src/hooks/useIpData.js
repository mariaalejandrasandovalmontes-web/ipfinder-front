import { useState, useEffect } from "react";
import { getIps, searchIp, deleteIp } from "../services/ipService";

export const useIpData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
    });

    const fetchData = async (page = 1, query = "") => {
        setLoading(true);
        try {
            const json = await getIps(page, query);
            setData(json.data);
            setPagination({
                current_page: json.current_page,
                last_page: json.last_page,
            });
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (ip) => {
        return await searchIp(ip);
    };

    const handleDelete = async (id, page, query) => {
        const res = await deleteIp(id);
        if (res.success) {
            fetchData(page, query);
        }
        return res;
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {
        data,
        loading,
        pagination,
        fetchData,
        handleSearch,
        handleDelete,
    };
};