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

        const problems = await Problem.find({
            user: req.user.id
        });

        res.status(200).json(problems);

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
    getProblems,updateProblem,deleteProblem
};