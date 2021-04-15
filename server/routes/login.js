const controller = require("../controllers/login");

module.exports = (router) => {
    router.route("/login").post(controller.signin);
};
