const errorHandler = (err, req, res, next) => {  
  const statusCode = err.status || 500;  
  const message = err.message || 'Внутренняя ошибка сервера';  
  
  res.status(statusCode).json({ status: statusCode, message });  
};  

export default errorHandler;  