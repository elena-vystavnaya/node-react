const jwt = require("jsonwebtoken");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const upload = require("../middlewars/imageServices");

module.exports = {
    getUser: async function (req, res, next) {
        try {
            const user = await User.findById(req.userId);

            res.json({
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
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
            const user = await User.findById(req.body.id);
            let update = {
                username: req.body.username,
                email: req.body.email,
            };
            if (req.body.newPassword) {
                let compare = await user.updatePassword(
                    req.body.currentPassword
                );
                if (!compare) {
                    res.json({
                        error: "Current password is wrong",
                    });
                } else {
                    const hashedPassword = await bcrypt.hash(
                        req.body.newPassword,
                        10
                    );
                    this.password = hashedPassword;
                    update.password = hashedPassword;
                }
            }
            await User.findByIdAndUpdate(req.userId, update);
            res.json({
                message: "User was update",
            });
        } catch (error) {
            if (error.name === "MongoError" && error.code === 11000) {
                res.json({
                    error: "This user is already registered",
                });
            } else
                res.json({
                    error: error.message,
                });
        }
    },
    updateAvatar: async function (req, res, next) {
        try {
            let avatar = {};
            avatar.data = req.file.filename;
            avatar.contentType = req.file.mimetype;
            await User.findByIdAndUpdate(
                req.userId,
                { avatar },
                {
                    new: true,
                }
            );
            res.json({
                message: "Your avatar was update",
            });
        } catch (error) {
            res.json({
                error: error.message,
            });
        }
    },
};
