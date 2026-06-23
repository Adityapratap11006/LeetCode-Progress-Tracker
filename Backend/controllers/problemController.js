const Problem = require("../models/Problem");
const mongoose = require("mongoose");

const addProblem = async (req, res) => {
    try {
        const {
            title,
            difficulty,
            status,
            topic,
            leetcodeLink
        } = req.body;

        const problemData = {
            title,
            difficulty,
            topic,
            leetcodeLink,
            user: req.user.id
        };

        if (status) {
            problemData.status = status;
            if (status === 'Solved') {
                problemData.solvedAt = new Date();
            }
        }

        const problem = await Problem.create(problemData);

        res.status(201).json(problem);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const getProblems = async (req, res) => {
    try {
        const {difficulty,status,topic,search,sort,page,limit}=req.query;

        const filter={user:req.user.id};
        if(difficulty){
            filter.difficulty=difficulty
        }
        if(status){
            filter.status=status
        }
        if(search){
            filter.title={
                $regex:search,
                $options:"i"
            };
        }
        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 10;
        const total = await Problem.countDocuments(filter);
        const problems = await Problem.find(filter)
            .sort(sort || '-createdAt')
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);
        const totalPages = Math.ceil(total / limitNumber);

        res.status(200).json({
            problems,
            totalPages,
            currentPage: pageNumber,
            total
        });

    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}
const getStats = async (req, res) => {
    try {

        const totalProblems = await Problem.countDocuments({
            user: req.user.id
        });

        const solvedProblems = await Problem.countDocuments({
            user: req.user.id,
            status: "Solved"
        });

        const attemptedProblems = await Problem.countDocuments({
            user: req.user.id,
            status: "Attempted"
        });

        const needReviewProblems = await Problem.countDocuments({
            user: req.user.id,
            status: "Need Review"
        });

        const easyProblems = await Problem.countDocuments({
            user: req.user.id,
            difficulty: "Easy"
        });

        const mediumProblems = await Problem.countDocuments({
            user: req.user.id,
            difficulty: "Medium"
        });

        const hardProblems = await Problem.countDocuments({
            user: req.user.id,
            difficulty: "Hard"
        });
        const problems = await Problem.find({
    user: req.user.id
});
       const totalTimeSpent = problems.reduce(
    (sum, problem) => sum + problem.timeSpentMinutes,
    0
);


        res.status(200).json({
            totalProblems,
            solvedProblems,
            attemptedProblems,
            needReviewProblems,
            easyProblems,
            mediumProblems,
            hardProblems,
             totalTimeSpent
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
const updateProblem=async(req,res)=>{
    try{
    const problem=await Problem.findById(req.params.id);
    if(!problem){
        return res.status(404).json({
            message:"Problem Not Found"
        });
    }
    if(problem.user.toString()!==req.user.id){
         return res.status(401).json({
                message: "Not authorized"
            });

    }
    if (req.body.status === "Solved") {
    req.body.solvedAt = new Date();
}
    const updatedProblem=await Problem.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new:true
        }
    );
   res.status(200).json(updatedProblem)
    }catch(err){
           res.status(500).json({
            message: err.message
        });

    }
    }
const deleteProblem=async(req,res)=>{
    try{
        const problem=await Problem.findById(req.params.id);
        if(!problem){
            return res.status(404).json({
                message:"Problem Not Found"
            });

        }
        if(problem.user.toString()!==req.user.id){
            return res.status(401).json({
                message:"Not authorized"
            });
        }
        await problem.deleteOne();
            res.status(200).json({
            message: "Problem deleted successfully"
        });
    }catch(err){

        res.status(500).json({
            message: err.message
        });
    }
};
const getProblemById=async(req,res)=>{
    try{
const problem=await Problem.findById(req.params.id)
 if (!problem) {
            return res.status(404).json({
                message: "Problem not found"
            });
        }


if(problem.user.toString()!==req.user.id){
    return res.status(403).json({
    message: "Not authorized"
});
}
res.status(200).json(problem);
    }catch(error){
         res.status(500).json({
            message: error.message
        });
    }
};
const getStreak=async(req,res)=>{
    try{
const solvedProblems = await Problem.find({
    user: req.user.id,
    status: "Solved"
},{
    solvedAt:1,
    _id:0
});
const dates = solvedProblems.map(problem =>
    problem.solvedAt.toISOString().split("T")[0]
);
 const uniqueDates = [...new Set(dates)];

        uniqueDates.sort().reverse();
 

        let streak=0;
        let currentDate=new Date();
        while(true){
                const dateString = currentDate.toISOString().split("T")[0];
                if(uniqueDates.includes(dateString)){
                    streak++;
                    currentDate.setDate(currentDate.getDate()-1);

                }
                else{
                    break;
                }
        }
        res.status(200).json({
    streak
});
    }
    catch(err){
          res.status(500).json({
            message: err.message
        });
    }
}
const getHeatmap = async (req, res) => {
    try {
        const heatmapData = await Problem.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(req.user.id),
                    status: "Solved",
                    solvedAt: { $ne: null }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$solvedAt"
                        }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } },
            {
                $project: {
                    _id: 0,
                    date: "$_id",
                    count: 1
                }
            }
        ]);
        res.status(200).json(heatmapData);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
module.exports = {
    addProblem,getStreak,getHeatmap,
    getProblems,updateProblem,deleteProblem,getStats,getProblemById
};