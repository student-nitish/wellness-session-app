 const User=require("../models/User");
 const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
 
 exports.registerUser = async (req, res) => {
       try {
   
           //data fetch from request ki body
           const {
               firstName,
               lastName, 
               email,
               password,
               confirmPassword,
           } = req.body;
           //validate 
          

           if(!firstName || !lastName || !email || !password || !confirmPassword) {
                   return res.status(403).json({
                       success:false,
                       message:"All fields are required",
                   })
           }
   
   
           //2 password match krlo
           if(password !== confirmPassword) {
               return res.status(400).json({
                   success:false,
                   message:'Password and ConfirmPassword Value does not match, please try again',
               });
           }
   
           //check user already exist or not
           const existingUser = await User.findOne({email});
           if(existingUser) {
               return res.status(400).json({
                   success:false,
                   message:'User is already registered',
               });
           }
   
   
   
           //Hash password
           const hashedPassword = await bcrypt.hash(password, 10);
   
           //entry create in Db
   
           const user = await User.create({
               firstName,
               lastName,
               email,
               password:hashedPassword,
               image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
           })
   
           //return res
           return res.status(200).json({
               success:true,
               message:'User is registered Successfully',
               user,
           });
       }
       catch(error) {
           console.log(error);
           return res.status(500).json({
               success:false,
               message:"User cannot be registrered. Please try again",
           })
       }
   
   };


   //Login
   exports.loginUser = async (req, res) => {
       try {
           //get data from req body
           const {email, password} = req.body;
           // validation data
           if(!email || !password) {
               return res.status(403). json({
                   success:false,
                   message:'All fields are required, please try again',
               });
           }
           //user check exist or not
           const user = await User.findOne({email});
           if(!user) {
               return res.status(401).json({
                   success:false,
                   message:"User is not registrered, please signup first",
               });
           }
           //generate JWT, after password matching
           if(await bcrypt.compare(password, user.password)) {
               const payload = {
                   email: user.email,
                   id: user._id,
                  
               }
               const token = jwt.sign(payload, process.env.JWT_SECRET, {
                   expiresIn:"1h",
               });
               user.token = token;
               user.password= undefined;
   
               //create cookie and send response
               const options = {
                   expires: new Date(Date.now() + 3*24*60*60*1000),
                   httpOnly:true,
                    secure: true,        // required on HTTPS origins like Vercel
                    sameSite: "none",    // needed for cross-origin cookie to be sent
               }
               res.cookie("token", token, options).status(200).json({
                   success:true,
                   token,
                   user,
                   message:'Logged in successfully',
               })
   
           }
           else {
               return res.status(401).json({
                   success:false,
                   message:'Password is incorrect',
               });
           }
           
       }
       catch(error) {
           console.log(error);
           return res.status(500).json({
               success:false,
               message:'Login Failure, please try again',
           });
       }
   };

   exports.logoutUser = (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(0),
    })
    .json({ success: true, message: "Logged out" });
};
