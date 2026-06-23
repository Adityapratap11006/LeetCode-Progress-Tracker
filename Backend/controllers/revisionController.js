const Problem = require("../models/Problem");

const getDaysToAdd = (revisionCount) => {
    if (revisionCount <= 1) return 1;
    if (revisionCount === 2) return 3;
    if (revisionCount === 3) return 7;
    if (revisionCount === 4) return 15;
    return 30;
};

const getDueRevisions = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(23, 59, 59, 999);

        const problems = await Problem.find({
            user: req.user.id,
            nextRevisionDate: { $ne: null, $lte: today }
        })
            .select("title difficulty revisionCount nextRevisionDate")
            .sort({ nextRevisionDate: 1 });

        res.status(200).json(problems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const completeRevision = async (req, res) => {
    try {
        const problem = await Problem.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }

        const newRevisionCount = (problem.revisionCount || 0) + 1;
        const daysToAdd = getDaysToAdd(newRevisionCount);
        const now = new Date();
        const nextDate = new Date(now);
        nextDate.setDate(nextDate.getDate() + daysToAdd);

        problem.revisionCount = newRevisionCount;
        problem.lastRevisionDate = now;
        problem.nextRevisionDate = nextDate;
        await problem.save();

        res.status(200).json({
            _id: problem._id,
            title: problem.title,
            difficulty: problem.difficulty,
            revisionCount: problem.revisionCount,
            lastRevisionDate: problem.lastRevisionDate,
            nextRevisionDate: problem.nextRevisionDate
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getRevisionStats = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(23, 59, 59, 999);

        const dueToday = await Problem.countDocuments({
            user: req.user.id,
            nextRevisionDate: { $ne: null, $lte: today }
        });

        const allProblems = await Problem.find({ user: req.user.id }, { revisionCount: 1 });
        const totalRevisionsCompleted = allProblems.reduce(
            (sum, p) => sum + (p.revisionCount || 0),
            0
        );

        res.status(200).json({
            dueToday,
            totalRevisionsCompleted
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getDueRevisions,
    completeRevision,
    getRevisionStats
};
