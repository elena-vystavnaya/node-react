import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

import { useBeforeUnload } from "./useBeforeUnload";

const SERVER_URL = "http://localhost:8000/";

export const useChat = (roomId) => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);

    const socketRef = useRef(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchData() {
            if (token) {
                const response = await axios.get(
                    "http://localhost:8000/api/user"
                );
                if (response.data) {
                    setUser(response.data);
                    localStorage.setItem("userId", response.data.id);
                }
            }
        }
        fetchData();
    }, [token]);

    useEffect(() => {
        if (user) {
            socketRef.current = io(SERVER_URL, {
                transports: ["websocket"],
                query: { roomId },
                auth: {
                    token: token,
                },
            });

            let userId = user && user.id;

            if (userId && token) {
                socketRef.current.emit("user:add", userId);
                socketRef.current.on("users", (users) => {
                    setUsers(users);
                });
                return () => {
                    socketRef.current.disconnect(userId);
                    socketRef.current.emit("user:leave", userId);
                };
            } else if (!token) {
                socketRef.current.emit("user:leave", userId);
                return () => {
                    socketRef.current.disconnect(userId);
                };
            }
        }
    }, [roomId, user, token]);

    useBeforeUnload(() => {
        socketRef.current.emit("user:leave", localStorage.getItem("userId"));
    });

    return { users };
};
