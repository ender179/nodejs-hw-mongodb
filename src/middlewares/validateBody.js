import createHttpError from 'http-errors';  

const validateBody = (requiredFields) => {  
    return (req, res, next) => {  
        const body = req.body;  

        for (const field of requiredFields) {  
            if (!body[field]) {  
                return next(createHttpError(400, `Поле "${field}" обязательно для заполнения`));  
            }  
        }  
        next();  
    };  
};  

export default validateBody; // Экспортируем как default  