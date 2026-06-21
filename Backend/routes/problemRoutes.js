const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
    addProblem,getProblems,updateProblem,
    deleteProblem
} = require("../controllers/problemController");
router.post(
    "/",
    authMiddleware,
    addProblem
);
router.delete("/:id",authMiddleware,deleteProblem)
router.get("/",authMiddleware,getProblems);
router.patch("/:id",authMiddleware,updateProblem)
module.exports = router;