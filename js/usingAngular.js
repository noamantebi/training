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

angular.module("mainApp", []);

angular.module("mainApp").controller("MainController", function($scope){
    $scope.appArray = createAppsArray();
    $scope.buttonStatusClick = function(app){
        app.status = changeStatus(app.status);
        app.statusButtonText = getStatusButtonText(app.status);
    }
});
