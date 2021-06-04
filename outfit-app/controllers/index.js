const router = require('express');
const apiRouter = require('./api');
const homeRouter = require("./homeroutes");

router.use("/", homeRouter);
router.use("/api", apiRouter);

module.exports = router;
