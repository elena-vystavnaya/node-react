const controller = require("../controllers/register");

module.exports = (router) => {
    router.route("/register").post(controller.create);
};
