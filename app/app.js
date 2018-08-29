'use strict';

angular.module('webtrekkApp', [
    'ngRoute',
    'webtrekkApp.constants',
    'webtrekkApp.i18n',
    'webtrekkApp.filters',

    'webtrekkApp.customerService',
    'webtrekkApp.navigationDataService',

    'webtrekkApp.customerForm',
    'webtrekkApp.customerOverview',
    'webtrekkApp.customerEdit',
    'webtrekkApp.customerCreate',
    'webtrekkApp.navigationData',
    /*third-party-libs*/
    'ui.bootstrap'

]).config(
    ['$locationProvider', '$routeProvider',
        function ($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');
            $routeProvider.otherwise({redirectTo: '/customerOverview'});
        }
    ]);
