import axios from "axios";
import { message } from "antd";
import { RESPONSE_API } from "../constants/urls";

export const usePost = (query) => {
    const response = async ({ variables }) => {
        const route = RESPONSE_API + query;
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
