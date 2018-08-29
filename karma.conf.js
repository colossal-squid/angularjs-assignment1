//jshint strict: false
module.exports = function (config) {
    config.set({

        basePath: './app',

        preprocessors: {
            'components/**/*.html': ['ng-html2js'],
            'customer-create/*.html': ['ng-html2js'],
            'customer-edit/*.html': ['ng-html2js'],
            'customer-overview/*.html': ['ng-html2js'],
            'navigation-data/*.html': ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
            moduleName: 'templates'
        },

        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-mocks/angular-mocks.js',
            /*OK, so this one could be mocked instead, agree*/
            'bower_components/angular-local-storage/dist/angular-local-storage.js',

            'app.js',
            'i18n/i18n.module.js',
            'components/filters/filters.module.js',
            'components/**/*.js',
            'services/*.js',
            'customer-create/*.js',
            'customer-edit/*.js',
            'customer-overview/*.js',
            'i18n/*.js',
            'navigation-data/*.js',

            'components/**/*.html',
            'customer-create/*.html',
            'customer-edit/*.html',
            'customer-overview/*.html',
            'navigation-data/*.html'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-ng-html2js-preprocessor'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
