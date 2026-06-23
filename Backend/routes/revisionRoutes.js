const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
    getDueRevisions,
    completeRevision,
    getRevisionStats
} = require("../controllers/revisionController");

router.use(authMiddleware);

router.get("/due", getDueRevisions);
router.get("/stats", getRevisionStats);
router.patch("/:id", completeRevision);

module.exports = router;
