'use strict';

angular.module('webtrekkApp.filters')
    .filter('age', function () {
        return function (text) {
            return (new Date().getFullYear() - new Date(text).getFullYear()) || '???';
        };
    });
