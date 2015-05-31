
angular.module("mainApp").factory('helperFactory', function (){
    return {
        getAppStatusName: function (app) {
            if (!app.deployment) {
                return 'Draft';
            }

            if (app.deployment.totalErrorVms > 0) {
                return 'Error';
            }

            if (app.deployment.totalActiveVms > 0) {
                return 'Running';
            }

            return 'Stopped';
        }
    }
});
