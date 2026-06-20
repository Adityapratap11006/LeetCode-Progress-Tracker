const Problem = require("../models/Problem");

const addProblem=async(req,res)=>{
    try{
        const {
            title,
            difficulty,
            topic,
            leetcodeLink
        }=req.body;
        const problem=await Problem.create({
            title,
            difficulty,
            topic,
            leetcodeLink,
            user:req.user.id
        });
        res.status(201).json(problem);

    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
};
module.exports = {
    addProblem
};