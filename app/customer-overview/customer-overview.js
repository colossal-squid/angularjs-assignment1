'use strict';

angular.module('webtrekkApp.customerOverview',
    ['ngRoute', 'webtrekkApp.constants', 'webtrekkApp.i18n', 'webtrekkApp.filters', 'webtrekkApp.customerService'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/customerOverview', {
            templateUrl: 'app/customer-overview/customer-overview.html',
            controller: 'CustomerViewController'
        });
    }])

    .controller('CustomerViewController', ['customerService', '$location', 'i18nService',
        function (customerService, $location, i18n) {
            //initial data load
            this.i18n = i18n.getString;
            this.data = customerService.getAll();

            /**
             * Navigates to customer-edit screen
             * @param id - customer ID
             */
            this.edit = function (id) {
                $location.url('/customerEdit').search('id', id);
            };

            /**
             * Deletes a record without a confirmation prompt
             * @type {function(this:*)}
             */
            this.delete = function (id) {
                customerService.remove(id);
                this.data = customerService.getAll();
            }.bind(this);

            /**
             * Navigates to customer-create screen
             */
            this.create = function () {
                $location.url('/customerCreate');
            };

            this.navi = function (id) {
                $location.url('/navigationData').search('id', id);
            }
        }]);