'use strict';

describe('Gender filter', function () {

    beforeEach(module('webtrekkApp.i18n', 'webtrekkApp.filters'));

    it('Formats JSON serialized gender using values from i18n bundle', (inject(function ($filter, i18nService) {
        var gender = $filter('gender');
        expect(gender).toBeDefined();
        expect(gender('m')).toEqual(i18nService.getString('gender.male'));
        expect(gender('w')).toEqual(i18nService.getString('gender.female'));
    })));
});