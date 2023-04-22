const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
            unique:true,
        },
        profilePic:{
            type:String,
            default:"",
        }
    }
    ,{timestamps:true}
);

module.exports=mongoose.model('User',UserSchema);



// The line of code module.exports=mongoose.model('User',UserSchema); exports a Mongoose model for a user schema.

// Here's a breakdown of what each part of this line does:

// module.exports is a special object in Node.js that is used to define what a module exports when it is required in another module. Anything that is assigned to module.exports will be returned by the require() function when the module is imported elsewhere.
// mongoose.model('User',UserSchema) creates a Mongoose model for a user schema. The first argument 'User' is the name of the model, and the second argument UserSchema is the schema that defines the structure of the model.
// The entire line combines these two parts into a single statement that exports the User model when this file is required in another module.
// In other words, this line exports a Mongoose model for a user schema with the name "User", so that other modules can use it to interact with a MongoDB database that contains user data.





