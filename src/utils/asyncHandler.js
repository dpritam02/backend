const asyncHandler = (requestHandler)=>{
    return (req, res, next)=>{
        //This code defines a higher-order function called asyncHandler, which wraps asynchronous request handlers in Express.js to automatically catch any errors and pass them to the next() middleware.
        Promise.resolve(requestHandler(req,res,next)).catch(err=>next(err));
    }
}


export { asyncHandler}






//for explination--------------------------------

// const asyncHandler = () =>{}
// const asyncHandler = (fn) => () => {}
// const asyncHandler = (fn) => async() => {}


// one way to do this job-----

// const asyncHandler = (fn) => async(req,res,next) => {
// the reason of using next, using middleware
//     try{
//         await fn(req,res,next);
//     }catch(error){
//         res.status(404 || error.code).json({success: false ,message: error.message});
//     }
// }