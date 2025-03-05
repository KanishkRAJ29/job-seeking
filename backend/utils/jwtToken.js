//if u register u login directly do not need to register again,this files creates a tol=ken a user get registered
export const sendToken=(user,statusCode,res,message)=>{
  const token=user.getJWTToken();
  const options= {
    httpOnly:true,
    secure: false,
    sameSite: "lax",
    expires: new Date(
      Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000),
      httpOnly:true,
      
  }
  res.status(statusCode).cookie("token",token,options).json({
    success: true,
   user,
   message,
   token,
  })
}