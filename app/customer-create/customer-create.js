'use strict';

angular.module('webtrekkApp.customerCreate',
    ['ngRoute', 'webtrekkApp.i18n', 'webtrekkApp.constants', 'webtrekkApp.customerService'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/customerCreate', {
            templateUrl: 'app/customer-create/customer-create.html',
            controller: 'CustomerCreateController'
        });
    }])

    .controller('CustomerCreateController', [
        'customerService', '$location', 'appConst', 'i18nService',

        function CustomerCreateController(customerService, $location, constants, i18nService) {
            this.constants = constants;
            this.i18n = i18nService.getString;
      
            this.model = {};

            this.cancel = function () {
                $location.path('/customerOverview').search('');
            };

            this.create = function () {
                customerService.create(this.model);
                $location.path('/customerOverview').search('');

            }

        }
    ]);