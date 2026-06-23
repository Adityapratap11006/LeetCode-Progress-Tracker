const jwt = require("jsonwebtoken");
const User=require("../models/User")
const bcrypt = require("bcryptjs");
const registerUser = async (req,res) => {
   try{
    const {username,email,password}=req.body;
    
    const existingUser = await User.findOne({ email });

if(existingUser){
    return res.status(400).json({
        message: "User already exists"
    });
}
const hashedPassword = await bcrypt.hash(password, 10);
    const user =await User.create({
        username,
        email,
   password: hashedPassword
    });
    res.status(201).json(user)
   }catch(err){
    res.status(500).json({
        message:err.message
    });
   }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User does not exist"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Password Incorrect"
            });
        }
const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
);
        return res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }

};
const getProfile=async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select("-password");
        res.status(201).json(user);
    }
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports={registerUser,loginUser,getProfile};