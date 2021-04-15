const jwt = require("jsonwebtoken");
const User = require("../models/users");

module.exports = {
    getUser: async function (req, res, next) {
        try {
            const user = await User.findById(req.userId);
            res.json({
                id: user.id,
                username: user.username,
                email: user.email,
                isOnline: true,
            });
        } catch (e) {
            res.send({ message: "Error in Fetching user" });
        }
    },
    getAllUsers: async function (req, res, next) {
        try {
            const users = await User.find({}, function (err, users) {
                var userMap = [];

                users.forEach(function (user) {
                    userMap.push(user);
                });
                res.send(userMap);
            });
        } catch (e) {
            res.send({ message: "Error in Fetching user" });
        }
    },
};
