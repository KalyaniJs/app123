import { genSalt, hashSync } from 'bcryptjs';
import { text } from 'express';
import { register, login } from "../services/users.services";

export function register(req, res, next) {
    const {password} = req.body;  //curly bracket put varibale name automatically fetch variable value from the object then assigned to the variable
    //user utilize bcrypt js to encrypt password it's allow us to crteae a salt salt creates the unique password even in the instant of two users choosing the same password
    const salt = genSalt(10);  //craete salt

    req.body.password = hashSync(password, salt);  //uhshing the password, user sent by the user and then mixing it with the salt and encrypting the password

    //REGISTER API
    register(req.body, (error, result) => {  //(errors, result) this two callbacks
        if(error) {
            return text(error); 
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
}

//LOGIN API
export function login(req, res, next) {
    const {username, password} = req.body;

    login({username, password}, (error, result) => {
        if(error) {
            return text(error); 
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        }); 
    });
}

export function userProfile(req, res, next) {
    return res.status(200).json({message:"Authorized User!"});
}


