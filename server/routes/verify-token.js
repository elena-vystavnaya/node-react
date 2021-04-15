const controller = require("../controllers/verify-token");

module.exports = (router) => {
    router.route("/verifyToken").get(controller.verifyToken);
};
