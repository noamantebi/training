/**
 * Created by noamantebi on 5/19/15.
 */

angular.module("mainApp", []);

angular.module("mainApp").controller("MyController", function($scope){
    var app = {
      name: 'yaron50',
      description: 'my best app',
      status: 'Running'
    };
    $scope.app = app;

});

angular.module("mainApp").controller("MyEmailController", function($scope){
    $scope.$watch('name', function(){
        $scope.email = $scope.app.name + '@ravello.com';
    })
});

angular.module("mainApp").controller("MySaveController", function($scope){
    $scope.save = function(){
        alert("Saving...")
    }
});

