'use strict';

angular.module('webtrekkApp.filters')
    .filter('gender', ['i18nService', function (i18n) {
        return function (text) {
            return 'w' === text ? i18n.getString('gender.female') : i18n.getString('gender.male');
        };
    }]);
