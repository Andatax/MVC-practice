const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./notesRoutes.js");

router.use("/", notesRoutes);
router.use("/api", apiRoutes);

module.exports = router;
