/**
 * Created by noamantebi on 5/20/15.
 */
angular.module("mainApp", []);

angular.module("mainApp").config(function($httpProvider){
    $httpProvider.defaults.headers.common['username'] = 'ravello@ravello.com';
    $httpProvider.defaults.headers.common['password'] = 'ravello';
});
