import axios from "axios";
import { message } from "antd";

export const usePost = (url) => {
    const response = async ({ variables }) => {
        const route = `http://localhost:8000/api/${url}`;
        const response = await axios.post(route, variables);
        try {
            if (response.data.error) {
                message.error(response.data.error);
            } else if (response.data) {
                return response.data;
            }
        } catch (error) {
            message.error("Something went wrong");
            console.log(error);
        }
    };

    return response;
};
