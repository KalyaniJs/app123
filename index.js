//server file

//import packages
import express, { json } from 'express';
import mongoose from 'mongoose';
import { Promise, connect } from 'mongoose';
// import { required } from 'nodemon/lib/config';
import  {db}  from './config/db.config.js';

import { authenticateToken } from './middlewares/auth';
import { erroHandler } from './middlewares/errors';

const app = express();    

mongoose.Promise = global.Promise;  //mongoose application use anywhere
//mongoose connction
mongoose.connect(db, {
     useNewUrlParser: true,
    useUnifiedTopoplogy: true,
}).then(
    () => {
        console.log('Database connected');
    },
    (error) => {
        console.log("Database can't be connected");
    }
);

authenticateToken.unless = unless;  //request check token or not dosn't show token show unautharies msg
//unless fetures by pass the pages not check any token this pages
app.use(
    authenticateToken.unless({
        path: [
            {url:"/users/login", methods:["POST"]},
            {url:"/users/register", methods:["POST"]},
        ],
    })
);

app.use(json()); //method inbuilt in the express to recognize the incomung request object as a json object (middleware)

app.use("/users",require("./routes/users.routes")); //intialize routes

app.use(erroHandler); //error middleware
 
//starting server
app.listen(process.env.port || 4000, function() {  
    console.log("Ready to Go!");
});