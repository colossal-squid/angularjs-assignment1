'use strict';

describe('Navigation data', function () {
    beforeEach(module(
        'webtrekkApp.i18n',
        'webtrekkApp.constants',
        'webtrekkApp.customerService',
        'webtrekkApp.navigationDataService',
        'webtrekkApp.navigationData'));

    it('can create', (inject(function ($controller) {
        expect($controller('NavigationDataController')).toBeDefined()
    })));

});