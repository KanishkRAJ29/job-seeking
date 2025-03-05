class ErrorHandler extends Error{
  constructor(message,statusCode){
    super(message);
    this.statusCode=statusCode;
  }
}

export const errorMiddleware=(err,req,res,next)=>{
  err.message=err.message||"Internal server error";
  err.statusCode=err.statusCode||500;

  if(err.name==="CaseError"){
    const message = `resourse not found invalid ${err.path}`;
    err=new ErrorHandler(message,400);
  }
  if(err.code===11000){
    const message = `Duplicate ${Object.keys(err.keyValue)} ENtered`;
    err=new ErrorHandler(message,400);
  }
  if(err.name==="JsonWebTockenError"){
    const message = `JsonWebTocken is invalid, try again`;
    err=new ErrorHandler(message,400);
  }
  if(err.name==="TockenExpiredError"){
    const message = `Json web tocken expired try again ${err.path}`;
    err=new ErrorHandler(message,400);
  }
  return res.status(err.statusCode).json({
    success:false,
    message: err.message,
  })
}

export default ErrorHandler;