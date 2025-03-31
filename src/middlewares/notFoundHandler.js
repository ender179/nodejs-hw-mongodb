const notFoundHandler = (req, res, next) => {  
  res.status(404).send({  
      status: 404,  
      message: "Ресурс не найден",  
  });  
};  

export default notFoundHandler;  