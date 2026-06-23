const StudyList = require("../models/StudyList");
const Problem = require("../models/Problem");

const createStudyList = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || !name.trim()) {
            return res.status(400).json({ message: "Study list name is required" });
        }
        const studyList = await StudyList.create({
            name: name.trim(),
            description: description || "",
            user: req.user.id
        });
        res.status(201).json(studyList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getStudyLists = async (req, res) => {
    try {
        const lists = await StudyList.find({ user: req.user.id })
            .populate("problems", "title difficulty status leetcodeLink")
            .sort({ createdAt: -1 });
        res.status(200).json(lists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getStudyListById = async (req, res) => {
    try {
        const list = await StudyList.findOne({
            _id: req.params.id,
            user: req.user.id
        }).populate("problems", "title difficulty status leetcodeLink language timeSpentMinutes");

        if (!list) {
            return res.status(404).json({ message: "Study list not found" });
        }
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateStudyList = async (req, res) => {
    try {
        const { name, description } = req.body;
        const update = {};
        if (name !== undefined) update.name = name.trim();
        if (description !== undefined) update.description = description;

        const list = await StudyList.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            update,
            { new: true, runValidators: true }
        );

        if (!list) {
            return res.status(404).json({ message: "Study list not found" });
        }
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteStudyList = async (req, res) => {
    try {
        const list = await StudyList.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!list) {
            return res.status(404).json({ message: "Study list not found" });
        }
        res.status(200).json({ message: "Study list deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addProblemToList = async (req, res) => {
    try {
        const list = await StudyList.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!list) {
            return res.status(404).json({ message: "Study list not found" });
        }

        const problemId = req.body.problemId;
        if (!problemId) {
            return res.status(400).json({ message: "Problem ID is required" });
        }

        const problem = await Problem.findOne({
            _id: problemId,
            user: req.user.id
        });

        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }

        if (list.problems.includes(problemId)) {
            return res.status(400).json({ message: "Problem already in this study list" });
        }

        list.problems.push(problemId);
        await list.save();

        const populated = await list.populate("problems", "title difficulty status leetcodeLink");

        res.status(200).json(populated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const removeProblemFromList = async (req, res) => {
    try {
        const list = await StudyList.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!list) {
            return res.status(404).json({ message: "Study list not found" });
        }

        list.problems = list.problems.filter(
            (p) => p.toString() !== req.params.problemId
        );
        await list.save();

        const populated = await list.populate("problems", "title difficulty status leetcodeLink");

        res.status(200).json(populated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createStudyList,
    getStudyLists,
    getStudyListById,
    updateStudyList,
    deleteStudyList,
    addProblemToList,
    removeProblemFromList
};
