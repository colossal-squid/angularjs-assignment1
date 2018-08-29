'use strict';

angular.module('webtrekkApp.navigationData', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/navigationData', {
            templateUrl: 'app/navigation-data/navigation-data.html',
            controller: 'NavigationDataController'
        });
    }])

    .controller('NavigationDataController', ['i18nService', 'navigationDataService', '$routeParams', '$location', 'customerService',
        function (i18n, navigationDataService, $routeParams, $location, customerService) {
            this.i18n = i18n.getString;
            if ($routeParams && $routeParams.id) {
                var id = Number($routeParams.id);
                this.data = navigationDataService.getData(id);
                var customer = customerService.get(id);
                this.name = customer.firstName + ' ' + customer.lastName;
            }
            
            this.back = function () {
                $location.url('/customerOverview').search('');
            }
        }]);