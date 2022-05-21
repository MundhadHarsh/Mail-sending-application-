// admin, 
const authPage = (permissions,userRole)=>{
    return(req,res,next)=>{
                
        if(permissions.include(userRole))
        {next()}
        {return res.status(401).json("You don't have the permission")}
    }
 }
const authCourse =(req,res,next)=>{
     
    next()
};
module.exports={
    authPage,
    authCourse

}