import mongoose, { model } from "mongoose";
const {Schema} = mongoose;
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cpassword: {
        type: String,
        required: true,
    },
});

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
         //creating setting and id property and removing _id and _v that value comming from by default value from mongodb and password hash send back to the client that we are removing from responce
        returnedObject.id = returnedObject._id.toString(); 
        delete returnedObject._id;
        delete returnedObject._v;
        delete returnedObject.password;
    },
});

//email validator
userSchema.plugin(uniqueValidator, {message:"Email already in use."});

//creating mongoose model 
//export this model will have the access to all mongoos query method acess to retrive data from mongodb
const User = model("user", userSchema);
export default User;