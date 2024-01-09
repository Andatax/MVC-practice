const router = require("express").Router();
const apiRoutes = require("./api");
const notesRoutes = require("./homePosts");

router.use("/", notesRoutes);
router.use("/api", apiRoutes);

module.exports = router;
