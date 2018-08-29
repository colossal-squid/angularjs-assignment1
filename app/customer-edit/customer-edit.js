'use strict';

angular.module('webtrekkApp.customerEdit', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/customerEdit', {
            templateUrl: 'app/customer-edit/customer-edit.html',
            controller: 'CustomerEditController'
        });
    }])

    .controller('CustomerEditController', [
        'customerService', '$location', '$routeParams', 'appConst', 'i18nService',
        function CustomerEditController(customerService, $location, $routeParams, constants, i18nService) {
            this.constants = constants;
            this.i18n = i18nService.getString;

            this.cancel = function () {
                $location.path('/customerOverview').search('');
            };

            this.update = function () {
                customerService.update(this.data);
                $location.path('/customerOverview').search('');
            };

            this.loadData = function (id) {
                this.data = customerService.get(id);
            };

            if ($routeParams && $routeParams.id) {
                this.loadData($routeParams.id);
            } else {
                /*if user manages to change id himself somehow*/
                this.cancel();
            }

        }
    ]);