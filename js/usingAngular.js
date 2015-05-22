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

function pushAll(srcArray, targetArray) {
    targetArray.length = 0;
    _.forEach(srcArray, function(item) {
        targetArray.push(item);
    });
}

angular.module("mainApp", []);

angular.module("mainApp").controller("MainController", function($scope){
    //$scope.filterByName = {};
    $scope.originAppArray = createAppsArray();
    $scope.appArray = [];
    pushAll($scope.originAppArray, $scope.appArray);
    $scope.buttonStatusClick = function(app){
        app.status = changeStatus(app.status);
        app.statusButtonText = getStatusButtonText(app.status);
    }
});

angular.module("mainApp").controller("myFilterController", function($scope){
    //$scope.$watch('filterByName', function(newValue, oldValue){
    //        if(newValue !== oldValue){
    //            if (newValue === ""){
    //                pushAll($scope.originAppArray, $scope.appArray);
    //            } else {
    //                var resultApp = _.filter($scope.appArray, function(app) {
    //                    return app.name.indexOf(newValue) >= 0;
    //                });
    //                if (resultApp.length > 0) {
    //                    pushAll(resultApp, $scope.appArray);
    //                }
    //            }
    //        }
    //    }
    //)
});
