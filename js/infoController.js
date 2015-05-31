/**
 * Created by noamantebi on 5/31/15.
 */
angular.module("mainApp").controller('infoController', function($scope, helperFactory) {

    function getVMStatusName(state){
        switch(state) {
            case 'STOPPED' : return 'Stopped';
            case 'STARTED' : return 'Running';
            default: return 'Error';
        }
    }

    $scope.appViewModel = {};
    $scope.$watch('appModel.selectedAppJson', function () {
        var selectedApp = $scope.appModel.selectedAppJson;
        if (_.isEmpty(selectedApp)) {
            return;
        }

        $scope.appViewModel.id = selectedApp.id;
        $scope.appViewModel.name = selectedApp.name;
        $scope.appViewModel.description = selectedApp.description;
        $scope.appViewModel.status = helperFactory.getAppStatusName(selectedApp);
        $scope.appViewModel.vms = [];

        var depMap = {};
        if (selectedApp.deployment) {
            depMap = _.indexBy(selectedApp.deployment.vms, 'id');
        }

        var sortedDesignVms = _.sortBy(selectedApp.design.vms, 'name');
        _.forEach(sortedDesignVms, function(vm) {
            var deploymentVm = depMap[vm.id];
            $scope.appViewModel.vms.push({
                    id: vm.id,
                    name: vm.name,
                    publishTime: deploymentVm ? new Date(deploymentVm.creationTime): '',
                    status: deploymentVm ? getVMStatusName(deploymentVm.state): 'Draft'
                }
            )
        });
    });

    $scope.renameApp = function() {
        $scope.rename($scope.appModel.selectedAppJson.id).then(function(jsonApp) {
            $scope.appModel.selectedAppJson = jsonApp;
        });
    };

});
