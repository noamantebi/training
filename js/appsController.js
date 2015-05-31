/**
 * Created by noamantebi on 5/31/15.
 */
angular.module("mainApp").controller('appsController', function($scope, dataFactory, helperFactory){

    function init() {
        $scope.originAppArray = [];
        $scope.viewModel = {
            appArray: [],
            filterByName: ''
        };

        loadApplications();
        initFilter();
    }

    function loadApplications(){
        dataFactory.getApplications().then(function(responseData){
            _.forEach(responseData, function(app) {
                $scope.originAppArray.push({
                    id: app.id,
                    name: app.name,
                    status: helperFactory.getAppStatusName(app),
                    owner: app.owner,
                    creationTime: new Date(app.creationTime),
                    statusButtonText: getStatusButtonText(this.name)
                })
            });
        }).catch(function(error){
            alert('Error: ' + error.data);
        });
    }

    function initFilter() {
        function filter() {
            $scope.viewModel.appArray = _.filter($scope.originAppArray, function (app) {
                if ($scope.viewModel.filterByName === '') {
                    return true;
                }
                return app.name.indexOf($scope.viewModel.filterByName) >= 0;
            })
        }

        $scope.$watch('viewModel.filterByName', function(){
            filter();
        });

        $scope.$watch('originAppArray', function(){
            filter();
        }, true);
    }

    function changeStatus(status) {
        return (status === 'Running') ? 'Stopped' : 'Running';
    }

    function getStatusButtonText(status){
        return  (status === 'Running') ? 'Stop' : 'Start';
    }


    $scope.updateStatus = function(app){
        app.status = changeStatus(app.status);
        app.statusButtonText = getStatusButtonText(app.status);
    };

    $scope.refresh = function(){
        $scope.originAppArray.length = 0;
        $scope.appModel.selectedAppJson = {};
        loadApplications();
    };

    $scope.renameApp = function(app) {
        $scope.rename(app.id).then(function(jsonApp) {
            app.name = jsonApp.name;
        });
    };

    init();
});

