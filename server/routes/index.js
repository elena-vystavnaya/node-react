const register = require("./register");
const login = require("./login");
const user = require("./user");
const verifyToken = require("./verify-token");

module.exports = (router) => {
    register(router);
    login(router);
    user(router);
    verifyToken(router);
    return router;
};
