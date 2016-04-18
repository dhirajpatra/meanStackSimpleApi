//Lets load the mongoose module in our program
var mongoose = require('mongoose');

//Lets connect to our database using the DB server URL.
mongoose.connect('mongodb://localhost:27017/simpleapi');

// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
// create model if not exists.
var addressSchema = new mongoSchema({
    //"_id"     : { type: Number },
    "address1" : { type: String, required: true },
    "address2" : { type: String, default : '' },
    "pin" : { type: Number, required: true },
    "country" : { type: String, required: true }
});

var addressModel = mongoose.model('addresses', addressSchema);

var userSchema  = new mongoSchema({
    //"_id"     : { type: Number },
    "user_email" : { type: String, required: true, unique: true },
    "user_password" : { type: String, required: true },
    "user_phone" : { type: String, required: true, unique:true },
    "address_id" : { type: mongoSchema.Types.ObjectId, ref: addressModel }
});
// create model if not exists.
var userModel = mongoose.model('users', userSchema);


// the schema is useless so far
// we need to create a model using it
var models = {    
    Address : addressModel,
    User : userModel
};

// make this available to our users in our Node applications
module.exports = models;
//module.exports = Address;
