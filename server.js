var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var userModel    =   require("./models/user");
var router      =   express.Router();

// user schema
var userDB  = userModel.User;
// address schema
var addressDB = userModel.Address;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.get("/",function(req,res){ //res.json(userDB + addressDB);
    res.json({"error" : false,"message" : "Hello World"});
});

router.route("/users")
    .get(function(req,res){
        var response = {}; 
        userDB.find({}/*,function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) { 
                response = {"error" : true,"message" : "Error fetching data"};
            } else { 
                response = {"error" : false,"message" : data};
            }
            res.json(response); 
        }*/).populate('addresses').exec(function(err,data) {
              if(err) { 
                response = {"error" : true,"message" : "Error fetching data"};
                } else { 
                    response = {"error" : false,"message" : data};
                }
                res.json(response);
            });
    })
    .post(function(req,res){  
        var response = {};
        // fetch email and password from REST request.
        // Add strict validation when you use this in Production.
        // insert addresses for this user
        var addDB = new userModel.Address;

        addDB.address1 = req.body.address1;
        addDB.address2 = req.body.address2;
        addDB.pin = req.body.pin;
        addDB.country = req.body.country;
    
        addDB.save(function(err){ 
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
            if(err) {
                response = {"error" : true,"message" : err + "Error adding user data"};
                //return handleError(err);
            } else {
                response = {"error" : false,"message" : "Address added successfully"};
                
                //the new user object
                var usrDB = new userModel.User;
                
                usrDB.user_email = req.body.user_email; 
                // Hash the password using SHA1 algorithm.
                usrDB.user_password =  req.body.user_password;
                usrDB.user_phone =  req.body.user_phone;                
                usrDB.address_id = addDB._id; 
                
                usrDB.save(function(err){
                    if(err) {
                        response = {"error" : true,"message" : err + "Error adding user data"};
                    //return handleError(err);
                    } else {
                        response = {"error" : false,"message" : "User added successfully"};                        
                    }                    
                    
                });
            }
            res.json(response);
        });
    });

   router.route("/users/:id")
    .get(function(req,res){
        var response = {};
        userDB.findById(req.params.id/*,function(err,data){
        // This will run Mongo Query to fetch data based on ID.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        }*/).populate('address_id').exec(function(err,data) {
              if(err) { 
                response = {"error" : true,"message" : "Error fetching data"};
                } else { 
                    response = {"error" : false,"message" : data};
                }
                res.json(response);
            });
    })
    .put(function(req,res){
        var response = {};
        // first find out record exists or not
        // if it does then update the record
        userDB.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
            // we got data from Mongo.
            // change it accordingly.
                if(req.body.user_email !== undefined) {
                    // case where email needs to be updated.
                    data.user_email = req.body.user_email;
                }
                if(req.body.user_password !== undefined) {
                    // case where password needs to be updated
                    data.user_password = req.body.user_password;
                }
                if(req.body.user_phone !== undefined) {
                    // case where password needs to be updated
                    data.user_phone = req.body.user_pone;
                }
                // save the data
                data.save(function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error updating data"};
                    } else {
                        response = {"error" : false,"message" : "User data is updated for "+req.params.id};
                    }
                    res.json(response);
                })
            }
        });
    })
    .delete(function(req,res){
        var response = {};
        // find the data
        userDB.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                // data exists, remove it.
                userDB.remove({_id : req.params.id},function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error deleting data"};
                    } else {
                        response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
                    }
                    res.json(response);
                });
            }
        });
    })

app.use('/',router);

app.listen(8080);
console.log("Listening to PORT 8080");