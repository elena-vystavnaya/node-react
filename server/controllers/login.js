const jwt = require("jsonwebtoken");
const User = require("../models/users");

module.exports = {
    signin: async function (req, res, next) {
        const user = new User({
            email: req.body.email,
            password: req.body.password,
        });
        const findUser = await User.findOne({ email: req.body.email });
        const isValidPass =
            findUser && (await user.comparePasswords(findUser.password));
        if (!findUser || !isValidPass) {
            res.json({ error: "Email or password is wrong" });
        } else {
            jwt.sign({ id: findUser.id }, "secretkey", (err, token) => {
                if (err) {
                    res.json(err);
                } else
                    res.json({
                        token,
                        id: findUser.id,
                        email: findUser.email,
                        username: findUser.username,
                        isOnline: true,
                    });
            });
        }
    },
};
