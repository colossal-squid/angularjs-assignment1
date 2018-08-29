/**
 * My very basic attempt at doing message bundles.
 * Obvious nitpick - the way i store message bundles is laughably bad.
 * Yes, they should be separate files, requested on app load (only one that's actually needed), i 100% agree.
 *
 * Ukrainian translation is done for as a proof of impl working
 */
angular.module('webtrekkApp.i18n').service('i18nService', ['textBundles', function (textBundles) {

    var locale = 'en_US';
    var bundle = textBundles[locale];
    return {

        getString: function (key) {
            var msg = bundle[key];
            if (!msg) {
                throw new Error('Key ' + key + ' was not found in bundle for locale "' + locale + '"');
            }
            return msg;
        }

    };

}]);