const controller = require("../controllers/user");

module.exports = (router) => {
    router.route("/user").get(controller.getUser);
    router.route("/users").get(controller.getAllUsers);
};
