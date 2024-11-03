const router = require("express").Router();
const userRouter = require("./user-routes");
const thoughtRouter = require("./thought-routes");

router.use("/user", userRouter);
router.use("/thought", thoughtRouter);

module.exports = router;
