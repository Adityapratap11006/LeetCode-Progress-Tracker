const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
    addProblem,getProblems,updateProblem,
    deleteProblem,getStats,getProblemById,getStreak
} = require("../controllers/problemController");
router.get("/stats", authMiddleware, getStats);
router.get("/streak",authMiddleware, getStreak);
router.post(
    "/",
    authMiddleware,
    addProblem
);
router.get("/:id", authMiddleware, getProblemById);
router.delete("/:id",authMiddleware,deleteProblem)
router.get("/",authMiddleware,getProblems);
router.patch("/:id",authMiddleware,updateProblem)
module.exports = router;