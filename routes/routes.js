const express = require('express');
const router = express.Router();
const astrologersRouter = require('./astrologersRoutes');
const usersRouter = require('./usersRoutes');

router.use("/users", usersRouter);
router.use("/astrologers", astrologersRouter);



module.exports = router;
