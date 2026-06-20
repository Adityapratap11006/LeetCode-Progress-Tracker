const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
    addProblem
} = require("../controllers/problemController");
router.post(
    "/",
    authMiddleware,
    addProblem
);
module.exports = router;