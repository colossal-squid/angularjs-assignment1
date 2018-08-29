'use strict';

describe('Customer overview', function () {

    beforeEach(module(
        'webtrekkApp.i18n',
        'webtrekkApp.constants',
        'webtrekkApp.filters',
        'webtrekkApp.customerService',
        'webtrekkApp.customerOverview',
        'templates'
    ));

    var model = {
        "id": 1,
        "firstName": "Peter",
        "lastName": "Smith",
        "dateOfBirth": "1996-10-12",
        "gender": "m",
        "lastContact": "2013-06-01",
        "clv": 191.12
    };


    it('Loads data on reveal', inject(function (customerService, $controller) {
        var spy = spyOn(customerService, 'getAll').and.returnValue([
            model
        ]);
        $controller('CustomerViewController');
        expect(spy).toHaveBeenCalled();
    }));

    describe('view', function () {

        var element, $scope, data = [model];

        beforeEach(inject(function ($templateCache, $rootScope, $compile, customerService) {
            spyOn(customerService, 'getAll').and.returnValue(data);
            var tpl = $templateCache.get('customer-overview/customer-overview.html');
            $scope = $rootScope.$new();
            element = angular.element(tpl);
            $scope.$apply(function () {
                $compile(element)($scope);
                angular.element(document.body).append(element);
            });
        }));

        afterEach(function () {
            angular.element(document.body).empty();
            $scope.$destroy();
        });

        it('Has expected view structure', inject(function (i18nService, $filter) {
            expect(element.find('h2').text()).toEqual(i18nService.getString('customer.overview'));
            var headers = Array.from(document.querySelectorAll('thead th')).map(i=>i.textContent);
            expect(headers).toEqual([
                i18nService.getString('customerOverview.firstName'),
                i18nService.getString('customerOverview.lastName'),
                i18nService.getString('customerOverview.birthday'),
                i18nService.getString('customerOverview.gender'),
                i18nService.getString('customerOverview.options')
            ]);
            var row = document.querySelectorAll('table tr td');
            expect(row[0].textContent).toBe(model.firstName);
            expect(row[1].textContent).toBe(model.lastName);
            expect(Number(row[2].textContent)).toBe($filter('age')(model.dateOfBirth))
            expect(row[3].textContent).toBe($filter('gender')(model.gender))
        }));

        it('routes to navigation data when navi is clicked', inject(function ($location) {
            var urlSpy = spyOn($location, 'url').and.callThrough();
            var searchSpy = spyOn($location, 'search');
            document.querySelector('td button:last-child').click();
            expect(urlSpy).toHaveBeenCalledWith('/navigationData');
            expect(searchSpy).toHaveBeenCalledWith('id', model.id);
        }));

        it('routes to edit view when edit is clicked', inject(function ($location) {
            var urlSpy = spyOn($location, 'url').and.callThrough();
            var searchSpy = spyOn($location, 'search');
            document.querySelector('td button:first-child').click();
            expect(urlSpy).toHaveBeenCalledWith('/customerEdit');
            expect(searchSpy).toHaveBeenCalledWith('id', model.id);
        }));

        it('calls customerService.remove when delete is clicked',  inject(function (customerService) {
            var removeSpy = spyOn(customerService, 'remove').and.callThrough();
            document.querySelector('td button:nth-child(2)').click();
            expect(removeSpy).toHaveBeenCalledWith(model.id);
        }));

        it('routes to creation page when Add new Customer is clicked', inject(function ($location) {
            var urlSpy = spyOn($location, 'url').and.callThrough();
            document.querySelector('button').click();
            expect(urlSpy).toHaveBeenCalledWith('/customerCreate');
        }));
    })

});