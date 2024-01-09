const router = require("express").Router();
const loginRoute = require("./userRoutes");

router.use("/loginUser", loginRoute);

module.exports = router;
