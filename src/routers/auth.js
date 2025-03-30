import { Router } from 'express';  
import pkg from 'jsonwebtoken';    
import createHttpError from 'http-errors';  
import validateBody from '../middlewares/validateBody.js';  
import UsersCollection from '../db/models/user.js';  

const { verify, sign } = pkg;  

const router = Router();  

router.post('/send-email', validateBody({ email: 'string|required' }), async (req, res, next) => {  
    const { email } = req.body;  

    try {  
        const user = await UsersCollection.findOne({ email });  
        if (!user) {  
            throw createHttpError(404, 'Пользователь не найден!');  
        }  

        const token = sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });   

        res.status(200).json({  
            status: 200,  
            message: 'Письмо успешно отправлено.',  
            token,  
        });  
    } catch (error) {  
        if (error instanceof createHttpError.HttpError) {  
            return next(error);  
        }  
        return next(createHttpError(500, 'Ошибка при обработке письма. Попробуйте снова позже.'));  
    }  
});  

// Эндпоинт для сброса пароля  
router.post('/reset-pwd', validateBody({ token: 'string|required', password: 'string|required' }), async (req, res, next) => {  
    const { token, password } = req.body;  

    try {  
        const decoded = verify(token, process.env.JWT_SECRET);  
        const user = await UsersCollection.findOne({ email: decoded.email });  

        if (!user) {  
            throw createHttpError(404, 'Пользователь не найден!');  
        }  

        user.password = password;   
        await user.save();  

        res.status(200).json({  
            status: 200,  
            message: 'Пароль успешно сброшен!',  
        });  
    } catch (error) {  
        if (error instanceof createHttpError.HttpError) {  
            return next(error);  
        }  
        return next(createHttpError(401, 'Токен недействителен.'));  
    }  
});  

export default router;  