let express = require("express");
let router = express.Router();
let user = require("../services/users.services");

router.route("/login").post(user.login);

module.exports = router;
