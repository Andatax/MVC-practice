const router = require("express").Router();
const loginRoute = require("./userRoutes");
const postRoutes = require("./postsRoutes");

router.use("/loginUser", loginRoute);
router.use("/Posts", loginRoute);

module.exports = router;
