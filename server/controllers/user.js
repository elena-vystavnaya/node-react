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
            await User.find({}, function (err, users) {
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
    updateUser: async function (req, res, next) {
        try {
            const user = await User.findById(req.userId);
            const updateUser = req.body;
            const newUser = new User({
                id: req.userId,
                username: updateUser.username,
                email: updateUser.email,
                password: updateUser.currentPassword,
                isOnline: false,
            });
            if (updateUser.newPassword) {
                const isValidPass = await newUser.comparePasswords(
                    user.password
                );
                console.log("isValidPass", isValidPass);
                if (isValidPass) {
                    const isSave = await newUser.save();
                    if (isSave) {
                        res.send({
                            success: true,
                            message: "User was successfully updated",
                        });
                    }
                    console.log("isSave", isSave);
                } else {
                    res.send({
                        success: false,
                        message: "Current password is wrong",
                    });
                }
            } else {
                await User.findByIdAndUpdate(req.userId, {
                    username: updateUser.username,
                    email: updateUser.email,
                });
                user.save();
                res.send({
                    success: true,
                    message: "User was successfully updated",
                });
            }
        } catch (error) {
            console.log(error);
            res.send({ message: error });
        }
    },
};
