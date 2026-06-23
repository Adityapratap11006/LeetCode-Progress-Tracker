const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
    createStudyList,
    getStudyLists,
    getStudyListById,
    updateStudyList,
    deleteStudyList,
    addProblemToList,
    removeProblemFromList
} = require("../controllers/studyListController");

router.use(authMiddleware);

router.post("/", createStudyList);
router.get("/", getStudyLists);
router.get("/:id", getStudyListById);
router.patch("/:id", updateStudyList);
router.delete("/:id", deleteStudyList);
router.post("/:id/problems", addProblemToList);
router.delete("/:id/problems/:problemId", removeProblemFromList);

module.exports = router;
