import express, { json } from "express";  
import contactsRouter from "./routers/contacts";  
import errorHandler from "./middlewares/errorHandler";  
import notFoundHandler from "./middlewares/notFoundHandler";  

const app = express();  

app.use(json());  

app.use("/contacts", contactsRouter);  

app.use(notFoundHandler);  
app.use(errorHandler);  