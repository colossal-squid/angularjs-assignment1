'use strict';

describe('Customer create view', function () {
    beforeEach(module(
        'LocalStorageModule', //could be a mock instead, yeah. I don't callThrough anyway, just a waste of memory
        'webtrekkApp.constants',
        'webtrekkApp.i18n',
        'webtrekkApp.customerService',
        'webtrekkApp.customerCreate',
        'templates'
    ));

    it('clears location and navigates back when Cancel is clicked', (inject(function ($controller, $location) {
        var ctrl = $controller('CustomerCreateController');
        var pathSpy = spyOn($location, 'path').and.callThrough();
        var searchSpy = spyOn($location, 'search');
        ctrl.cancel();
        expect(pathSpy).toHaveBeenCalledWith('/customerOverview');
        expect(searchSpy).toHaveBeenCalledWith('');
    })));


    it('creates a record, clears location and navigates back when Create is clicked',
        (inject(function ($controller, $location, customerService) {
            var ctrl = $controller('CustomerCreateController');
            ctrl.model = {
                "id": 1,
                "firstName": "Peter",
                "lastName": "Smith",
                "dateOfBirth": "1996-10-12",
                "gender": "m",
                "lastContact": "2013-06-01",
                "clv": 191.12
            };
            var pathSpy = spyOn($location, 'path').and.callThrough();
            var searchSpy = spyOn($location, 'search');
            var createSpy = spyOn(customerService, 'create');
            ctrl.create();
            expect(pathSpy).toHaveBeenCalledWith('/customerOverview');
            expect(searchSpy).toHaveBeenCalledWith('');
            expect(createSpy).toHaveBeenCalledWith(ctrl.model);
        })));

    describe('view', function () {
        var element, $scope;

        beforeEach(inject(function ($templateCache, $rootScope, $compile) {
            var tpl = $templateCache.get('customer-create/customer-create.html');
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

        it('has correct view structure', inject(function (i18nService) {
            expect(element.find('h2').text()).toEqual(i18nService.getString('customer.addNew'));
            expect(document.querySelector('.btn.btn-success').innerText).toEqual(i18nService.getString('create'));
            expect(document.querySelector('.btn.btn-default').innerText).toEqual(i18nService.getString('cancel'));
        }));

        it('disables Create button when is-disabled two-way binding set to true', function () {
            var btn = document.querySelector('.btn.btn-success');
            expect(btn.disabled).toBe(true);
            element.controller().isValid = true;
            $scope.$digest();
            expect(btn.disabled).toBe(false);
        })

    });
    
});