const jwt = require("jsonwebtoken");
const User = require("../models/users");

module.exports = {
    create: async function (req, res, next) {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            isOnline: false,
        });
        try {
            const saveUser = await user.save();
            if (saveUser) {
                jwt.sign({ id: user.id }, "secretkey", (err, token) => {
                    if (err) {
                        res.json(err);
                    } else res.json({ token });
                });
            }
        } catch (error) {
            res.json({ error: error.message });
        }
    },
};
