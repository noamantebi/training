/**
 * Created by noamantebi on 5/20/15.
 */
var changeStatus = function(status){
    return (status === 'Running') ? 'Stopped' : 'Running';
}
var getStatusButtonText = function(status){
    return  (status === 'Running') ? 'Stop' : 'Start';
}

var createAppsArray = function(){
    var app1 = {
        name: 'tomi-the-king',
        status: 'Running',
        owner: 'yaniv',
        creationTime: '4/16/15',
        statusButtonText: getStatusButtonText('Running')
    }

    var app2 = {
        name: 'ben-ben',
        status: 'Stopped',
        owner: 'ben',
        creationTime: '3/12/15',
        statusButtonText: getStatusButtonText('Stopped')
    }

    var app3 = {
        name: 'the-wolf',
        status: 'Error',
        owner: 'daniel',
        creationTime: '2/11/15',
        statusButtonText: getStatusButtonText('Error')
    }

    var app4 = {
        name: 'iftachaviv',
        status: 'Running',
        owner: 'iftachaviv',
        creationTime: '1/21/15',
        statusButtonText: getStatusButtonText('Running')
    }

    return [app1,app2,app3,app4];
}

function setAll(srcArray, targetArray) {
    targetArray.length = 0;
    _.forEach(srcArray, function(item) {
        targetArray.push(item);
    });
}

angular.module("mainApp", []);

angular.module("mainApp").controller("MainController", function($scope){

    $scope.originAppArray = createAppsArray();
    $scope.viewModel = {
        appArray: []
    };
    $scope.updateStatus = function(app){
        app.status = changeStatus(app.status);
        app.statusButtonText = getStatusButtonText(app.status);
    }

});

angular.module("mainApp").controller("myHeaderController", function($scope){
    $scope.viewModel.filterByName = '';
    $scope.$watch('viewModel.filterByName', function(){
        $scope.viewModel.appArray = _.filter($scope.originAppArray, function(app) {
            if ($scope.viewModel.filterByName === '') {
                return true;
            }
            return app.name.indexOf($scope.viewModel.filterByName) >= 0;
        });
    });
    $scope.clearFilter = function(){
        $scope.viewModel.filterByName = '';
    }
});
