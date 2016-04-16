//Lets load the mongoose module in our program
var mongoose = require('mongoose');

//Lets connect to our database using the DB server URL.
mongoose.connect('mongodb://localhost:27017/simpleapi');

// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var userSchema  = new mongoSchema({
    "user_email" : { type: String, required: true, unique: true },
    "user_password" : { type: String, required: true },
    "user_phone" : { type: String, required: true, unique:true }
});
// create model if not exists.

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('users', userSchema);

// make this available to our users in our Node applications
module.exports = User;
