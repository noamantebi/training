/**
 * Created by noamantebi on 5/31/15.
 */

angular.module("mainApp").controller("mainController", function($scope, $q, dataFactory) {
    $scope.appModel = {
        selectedAppJson: {}
    };
    $scope.getInfo = function(id){
        dataFactory.getApplication(id).then(function(responseData){
            $scope.appModel.selectedAppJson = responseData;
        }).catch(function(responseData){
            alert('Error: ' + responseData);
        });
    };

    $scope.rename = function(id) {
        var newName = prompt('Enter a new name for the application:');
        return dataFactory.getApplication(id).then(function (responseData) {
            responseData.name = newName;
            return dataFactory.updateApplication(id, responseData).then(function(responseData) {
                return responseData;
            });
        }).catch(function (error) {
            alert('Error: ' + error);
            return $q.reject(error);
        });
    }
    $scope.hasSelection = function(){
        return !_.isEmpty($scope.appModel.selectedAppJson)
    }
});

