import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import {sendToken} from "../utils/jwtToken.js"



export const register = catchAsyncError(async(req,res,next)=>{
const {name,email,phone,role,password}=req.body;
if(!name||!email||!phone||!role||!password){
  return next(new ErrorHandler("Please Fill Full Form"));
}
const isEmail=await User.findOne({email});
if(isEmail){
  return next(new ErrorHandler("Email already exists"));  
}
  const user= await User.create({
    name,email,phone,role,password,
  });
 sendToken(user,200,res,"user Resistered !");

});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email ,password and role."));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  if (user.role !== role) {
    return next(
      new ErrorHandler(`User with provided email and ${role} not found!`, 404)
    );
  }
  sendToken(user, 201, res, "User Logged In!");
});

export const Logout=catchAsyncError(async(req,res,next)=>{
res.status(201).cookie("token","",{
  httpOnly: true,
  expires: new Date(Date.now()),
}).json({
  success: true,
  message: "user logged out successfully",
});
});

export const getUser = catchAsyncError(async(req,res,next)=>{
  const user= req.user;
  res.status(200).json({
    success: true,
    user,
  })
})