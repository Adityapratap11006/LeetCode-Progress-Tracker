const Problem = require("../models/Problem");

const addProblem = async (req, res) => {
    try {
        const {
            title,
            difficulty,
            topic,
            leetcodeLink
        } = req.body;

        const problem = await Problem.create({
            title,
            difficulty,
            topic,
            leetcodeLink,
            user: req.user.id
        });

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
const limitNumber = parseInt(limit) || 5;
const problems = await Problem.find(filter)
    .sort(sort)
    .skip((pageNumber - 1) * limitNumber)
    .limit(limitNumber);
res.status(200).json(problems);

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
module.exports = {
    addProblem,
    getProblems,updateProblem,deleteProblem,getStats
};