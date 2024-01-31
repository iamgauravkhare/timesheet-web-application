const express = require("express");
const { signIn, signUp } = require("../controllers/auth");
const { isAuthencated, isManager, isEmployee } = require("../middlewares/auth");
const { createEntry } = require("../controllers/timesheetEntry");
const { userData, managersList } = require("../controllers/user");
const { markRating } = require("../controllers/rating");
const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.get("/managers-list", managersList);
router.post("/create-entry", isAuthencated, isEmployee, createEntry);
router.post("/user-data", isAuthencated, userData);
router.post("/mark-rating", isAuthencated, isManager, markRating);

module.exports = router;
