# meanStackSimpleApi
Simple yes powerful cross domain REST API creation by MEAN stack [MongoDB, Nodejs Express lib, Angular Js, Node.js]

Now multiple collection and JOIN data fetch and save.

<small>now AngularJs front end added with cros domain API call</small>

Steps to be followed to run the application:

1. Either you can follow http://mean.io/#!/ to create full NPM enviromnet with MEAN stack
or
1. Follow the steps to install and ready MEAN stack on NPM

https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server
https://chrisbitting.com/2014/06/16/local-web-server-for-testing-development-using-node-js-and-http-server/
http://mongoosejs.com/

2. Create a folder for your application
3. # npm install
4. # npm start [to compile and start to run the applicaion]
5. Test in any REST client like postman in chorme 

API URL:

http://localhost:8080/ [GET]

http://localhost:8080/users [GET]
From AngularJs html front end : http://localhost/pathofproject/angular_simpleapi/

http://localhost:8080/users [POST] 
Request parameter [URL encoded form]: {"user_email" : "testee@fsfd.com", "user_password": "test1313", "user_phone":"4646644644", "address1":"test address", "address2":"test address 2","pin":"78444", "country":"test country"}
From AngularJs html front end : http://localhost/pathofproject/angular_simpleapi/user.html

http://localhost:8080/users/[id] [GET]

http://localhost:8080/users/[id] [POST]
for update and delete.

Keep in touch I will continue update the application with many features.

Regards 