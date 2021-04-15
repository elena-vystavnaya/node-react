module.exports = {
    verifyToken: function (req, res) {
        return res.status(200).send({ message: "Authorized!" });
    },
};
