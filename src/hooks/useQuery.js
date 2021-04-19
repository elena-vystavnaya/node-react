import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { message } from "antd";

export const useQuery = (query) => {
    const [data, setDate] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetch = useCallback(() => {
        const fetchApi = async () => {
            setLoading(true);
            const route = `http://localhost:8000/api/${query}`;
            const response = await axios.get(route);
            try {
                if (response.data.error) {
                    message.error(response.data.error);
                } else if (response.data) {
                    setDate(response.data);
                }
            } catch (error) {
                message.error("Something went wrong");
                console.log(error);
            }
            setLoading(false);
        };

        fetchApi();
    }, [query]);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return { data, loading, refetch: fetch };
};
