import { ONE_DAY } from '../constants/index.js';  
import {  
  loginUser,  
  logoutUser,  
  refreshUsersSession,  
  registerUser,  
  requestResetToken,  
  resetPassword,  
} from '../services/auth.js';  

const handleError = (res, error, statusCode = 500) => {  
  res.status(statusCode).json({  
    status: statusCode,  
    message: error.message,  
  });  
};  

export const registerUserController = async (req, res) => {  
  try {  
    const user = await registerUser(req.body);  
    res.status(201).json({  
      status: 201,  
      message: 'Successfully registered a user!',  
      data: user,  
    });  
  } catch (error) {  
    handleError(res, error);  
  }  
};  

export const loginUserController = async (req, res) => {  
  try {  
    const session = await loginUser(req.body);  
    
    res.cookie('refreshToken', session.refreshToken, {  
      httpOnly: true,  
      secure: process.env.NODE_ENV === 'production',  
      expires: new Date(Date.now() + ONE_DAY),  
    });  
    
    res.cookie('sessionId', session._id, {  
      httpOnly: true,  
      secure: process.env.NODE_ENV === 'production',  
      expires: new Date(Date.now() + ONE_DAY),  
    });  

    res.json({  
      status: 200,  
      message: 'Successfully logged in a user!',  
      data: {  
        accessToken: session.accessToken,  
      },  
    });  
  } catch (error) {  
    handleError(res, error, 401);  
  }  
};  

export const logoutUserController = async (req, res) => {  
  try {  
    if (req.cookies.sessionId) {  
      await logoutUser(req.cookies.sessionId);  
    }  

    res.clearCookie('sessionId');  
    res.clearCookie('refreshToken');  
    res.status(204).send();  
  } catch (error) {  
    handleError(res, error);  
  }  
};  

const setupSession = (res, session) => {  
  res.cookie('refreshToken', session.refreshToken, {  
    httpOnly: true,  
    secure: process.env.NODE_ENV === 'production',  
    expires: new Date(Date.now() + ONE_DAY),  
  });  
  res.cookie('sessionId', session._id, {  
    httpOnly: true,  
    secure: process.env.NODE_ENV === 'production',  
    expires: new Date(Date.now() + ONE_DAY),  
  });  
};  

export const refreshUsersSessionController = async (req, res) => {  
  try {  
    const session = await refreshUsersSession({  
      sessionId: req.cookies.sessionId,  
      refreshToken: req.cookies.refreshToken,  
    });  

    setupSession(res, session);  

    res.json({  
      status: 200,  
      message: 'Successfully refreshed a session!',  
      data: {  
        accessToken: session.accessToken,  
      },  
    });  
  } catch (error) {  
    handleError(res, error, 401);  
  }  
};  

export const requestResetEmailController = async (req, res) => {  
  try {  
    await requestResetToken(req.body.email);  
    res.json({  
      status: 200,  
      message: 'Reset password email has been successfully sent.',  
      data: {},  
    });  
  } catch (error) {  
    handleError(res, error);  
  }  
};  

export const resetPasswordController = async (req, res) => {  
  try {  
    await resetPassword(req.body);  
    res.json({  
      message: 'Password has been successfully reset.',  
      status: 200,  
      data: {},  
    });  
  } catch (error) {  
    handleError(res, error, 400);  
  }  
};  