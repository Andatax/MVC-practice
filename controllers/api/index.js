const router = require("express").Router();
const loginRoute = require("./userRoutes");
const postRoutes = require("./postsRoutes");

router.use("/sessionsUser", loginRoute);
router.use("/posts", postRoutes);

module.exports = router;
