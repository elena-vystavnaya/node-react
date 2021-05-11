const controller = require("../controllers/user");
const upload = require("../middlewars/imageServices");

module.exports = (router) => {
    router.route("/user").get(controller.getUser);
    router.route("/users").get(controller.getAllUsers);
    router.route("/updateUser").post(controller.updateUser);
    router
        .route("/updateAvatar")
        .post(upload.single("avatar"), controller.updateAvatar);
};
