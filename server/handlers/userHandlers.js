const User = require("../models/users");

module.exports = async (io, socket) => {
    const getUsers = async (userId, update) => {
        await User.findByIdAndUpdate(userId, update);
        const users = await User.find({});
        io.in(socket.roomId).emit("users", users);
    };

    const addUser = async (userId) => {
        const user = await User.findById(userId);
        const update = {
            username: user.username,
            email: user.email,
            password: user.password,
            isOnline: true,
        };

        getUsers(userId, update);
    };

    const removeUser = async (userId) => {
        const user = await User.findById(userId);
        const update = {
            username: user.username,
            email: user.email,
            password: user.password,
            isOnline: false,
        };

        getUsers(userId, update);
    };

    socket.on("user:get", getUsers);
    socket.on("user:add", addUser);
    socket.on("user:leave", removeUser);
};
