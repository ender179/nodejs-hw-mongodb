import createHttpError from 'http-errors';  

const errorHandler = (err, req, res, next) => {  
    if (createHttpError.isHttpError(err)) {  
        return res.status(err.status).json({  
            status: err.status,  
            message: err.message,  
        });  
    }  

    res.status(500).json({  
        status: 500,  
        message: 'Something went wrong',  
    });  
};  

export default errorHandler;
