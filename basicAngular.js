/**
 * Created by noamantebi on 5/19/15.
 */

angular.module("mainApp", []).
    controller("MyController",
        function($scope){
            $scope.name = 'yaron50';
            $scope.description = 'my best app';
            $scope.save = function(){
                alert("Saving...")
            }
        })

