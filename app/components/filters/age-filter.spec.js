'use strict';

describe('Age filter', function () {
    beforeEach(module('webtrekkApp.filters'));

    it('Shows correct age calculated from year of birth, regarding current date', (inject(function ($filter) {
        var age = $filter('age');
        var df = $filter('date');
        var tenYearsAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 10);
        expect(age).toBeDefined();
        expect(age(df(tenYearsAgo, 'yyyy-MM-dd'))).toBe(10);
    })));

    it('Shows "???" for incorrect input', (inject(function ($filter) {
        var age = $filter('age');
        expect(age('')).toBe('???');
        expect(age('not-a-date')).toBe('???');
        expect(age(undefined)).toBe('???');
    })));

});