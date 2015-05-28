/**
 * Created by noamantebi on 5/20/15.
 */
var mainApp = angular.module("mainApp", []);

mainApp.config(function($httpProvider){
    $httpProvider.defaults.headers.common['username'] = 'ravello@ravello.com';
    $httpProvider.defaults.headers.common['password'] = 'ravello';
});



mainApp.factory('dataFactory', function ($http){
   return {
               getApplications: function(){
                   return $http.get('/services/applications');
               },
               getApplication: function(id){
                    return $http.get('/services/applications/'+id);
               },
               updateApplication: function(id, data){
                   return $http.put('/services/applications/'+id, data);
               }
         }
});


mainApp.controller("mainController", function($scope, dataFactory) {
    $scope.showInfo = false;
    $scope.appModel = {
        selectedAppJson: {}
    };
    $scope.getInfo = function(id){
        $scope.showInfo = {
            value: true
        }
        dataFactory.getApplication(id).then(function(response){
            $scope.appModel.selectedAppJson = response.data;
        }).catch(function(response){
            alert('Error: ' + response.data);
        });
    }

    $scope.rename = function(id, getAppliction) {
        var newName = prompt('Enter a new name for the application:');
        if (getAppliction) {
            dataFactory.getApplication(id).then(function (response) {
                response.data.name = newName;
                if (!_.isEmpty($scope.appModel.selectedAppJson) && ($scope.appModel.selectedAppJson.id === response.data.id)){
                    $scope.appModel.selectedAppJson.name = newName;
                }
                return dataFactory.updateApplication(id, response.data);
            }).then(function () {
                alert("Action succeeded - press Refresh to see the changes in the apps list");
            }).catch(function (response) {
                alert('Error: ' + response);
            });
        }else{
            $scope.appModel.selectedAppJson.name = newName;
            dataFactory.updateApplication(id, $scope.appModel.selectedAppJson).then(function () {
                alert("Action succeeded - press Refresh to see the changes");
            }).catch(function (response) {
                alert('Error: ' + response);
            })
        }
    }

});

mainApp.controller("appsController", function($scope, dataFactory){
    $scope.originAppArray=[];
    //load all applications
    loadApplications();

    $scope.viewModel = {
        appArray: [],
        filterByName: ''

    };
    var filter = function() {
        $scope.viewModel.appArray = _.filter($scope.originAppArray, function (app) {
            if ($scope.viewModel.filterByName === '') {
                return true;
            }
            return app.name.indexOf($scope.viewModel.filterByName) >= 0;
        })
    };

    $scope.$watch('viewModel.filterByName', function(){
        filter();
    });

    $scope.$watch('originAppArray', function(){
        filter();
    }, true);

    function loadApplications(){
        dataFactory.getApplications().then(function(response){
            for(var i = 0; i< response.data.length; i++){
                var app = response.data[i];
                $scope.originAppArray.push({
                    id: app.id,
                    name: app.name,
                    status: getStatus(app.deployment),
                    owner: app.owner,
                    creationTime: new Date(app.creationTime),
                    statusButtonText: getStatusButtonText(this.name)
                })
            }
        }).catch(function(response){
            alert('Error: ' + response);
        });
    }

    $scope.updateStatus = function(app){
        app.status = changeStatus(app.status);
        app.statusButtonText = getStatusButtonText(app.status);
    };

    $scope.refresh = function(){
        $scope.originAppArray.length = 0;
        $scope.appModel.selectedAppJson = {};
        $scope.showInfo.value = false;
        loadApplications();
    }

});

mainApp.controller('infoController', function($scope) {
    $scope.appViewModel = {};
    $scope.$watch('appModel.selectedAppJson', function () {
        if (!_.isEmpty($scope.appModel.selectedAppJson)) {
            $scope.appViewModel.id = $scope.appModel.selectedAppJson.id;
            $scope.appViewModel.name = $scope.appModel.selectedAppJson.name;
            $scope.appViewModel.description = $scope.appModel.selectedAppJson.description;
            $scope.appViewModel.status = getStatus($scope.appModel.selectedAppJson.deployment);
            $scope.appViewModel.vms = [];
        }

        //create a map for deployment
        var depMap = {};
        for (var i = 0; $scope.appModel.selectedAppJson.deployment  && i < $scope.appModel.selectedAppJson.deployment.vms.length; i++) {
            depMap[$scope.appModel.selectedAppJson.deployment.vms[i].id] = {
                publishTime: new Date($scope.appModel.selectedAppJson.deployment.vms[i].creationTime),
                status: getVMStatus($scope.appModel.selectedAppJson.deployment.vms[i].state)
            }
        }
        for (var i = 0; i < $scope.appModel.selectedAppJson.design.vms.length; i++) {
            var id = $scope.appModel.selectedAppJson.design.vms[i].id;
            var publishTime = '';
            var status = 'Draft';
            if (depMap[id]){
                publishTime = depMap[id].publishTime;
                status = depMap[id].status;
            }
            $scope.appViewModel.vms.push({
                    id: id,
                    name: $scope.appModel.selectedAppJson.design.vms[i].name,
                    publishTime: publishTime,
                    status: status
                }
            )
        }
    }, true)

});


var changeStatus = function(status){
    return (status === 'Running') ? 'Stopped' : 'Running';
}
var getStatusButtonText = function(status){
    return  (status === 'Running') ? 'Stop' : 'Start';
}

function getStatus(dep){
    if (dep == null){
        return 'Draft';
    } else if(dep.totalErrorVms > 0) {
        return 'Error';
    } else if (dep.totalActiveVms > 0) {
        return 'Running';
    } else {
        return 'Stopped';
    }
}

function getVMStatus(state){
    if (state === 'STOPPED'){
        return 'Stopped';
    }else if (state === 'STARTED'){
        return 'Running';
    }
    else return 'Error';

}
