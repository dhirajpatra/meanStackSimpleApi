app.controller('MainController', ['$scope','$http', 

function($scope, $http) {
    
    // common http API related directives
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    //$http.defaults.headers.post["X-API-KEY"] = "41CB86796F3BA";
    $http.crossDomain = true; 
    $scope.url = "http://localhost:8080/";
    
    // for fetchallusers API
    $scope.fetchallusers = function(){
        //console.log("i am here ");        
        $http.get($scope.url + "users").success(function(data, status){
            $scope.users = data.message;
            //console.log($scope.users);
        }).error(function(data, status){
            $scope.status = status;
            console.log(status);
        });
        
    }

    // for createuser API
    $scope.createuser = function(){
        console.log("i am here " + $scope.email);
        /*$http({
                method: "post",
                url: $scope.url + "users",
                data: "{\"email\":\""+$scope.email+"\",\"password\":\""+$scope.password+"\",\"phone\":\""+$scope.phone+"\",\"address1\":\""+$scope.address1+"\",\"address2\":\""+$scope.address2+"\",\"pin\":\""+$scope.pin+"\,\"country\":\""+$scope.country+"\"}"
        }).success (function(data,status,headers,config){                     
             $scope.data = data;
             console.log(data);
        }).error(function(data, status, headers, config){
             $scope.status = status;
            console.log(status);
        });*/
        
    }
		
}]);
