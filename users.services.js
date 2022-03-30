import User, { findOne } from "../models/user.model";
import { compareSync } from "bcryptjs";
import { required } from "nodemon/lib/config";
import { response } from "express";
import { generateAccessToken } from "../middlewares/auth.js";

//passing token in login api
//use await and async function
async function login({username, password}, callbacks) {  //callback is a parameter
    const user = await findOne({username});    //calling the mogoose User.findOne by passing username

    if (user != null) {   //checking user not of null
        if (compareSync(password, user.password)) {  //comparing the password which is enter by the user & comaper with it's database password
            const token = generateAccessToken(username);  //token from auth api with th middleware
            return callbacks(null, {...user.toJSON(), token});  //returning callback for user.json and token
        }
        //callback of message invalid username and password
        else{
            return callbacks({
                message:"Invalid Username/Password!",
            })
        }
    }
    //callback of msg user is not found
    else{
        return callbacks({
            message:"Invalid Username/Password!"
        })
    }    
}

async function register(paerams, callback) {
    if (paerams.username === undefined) {
        return callback({message:"Username Required"});
    }

    const user = new User(params);
    user.save()
    .then((response) => {
        return callback(null, response);
    }) 
    .catch((error) => {
        return callback(error);
    });
}

export default {
    login,
    register,
};