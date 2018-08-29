'use strict';

describe('Customer create view', function () {
    beforeEach(module(
        'LocalStorageModule', //could be a mock instead, yeah. I don't callThrough anyway, just a waste of memory
        'webtrekkApp.constants',
        'webtrekkApp.i18n',
        'webtrekkApp.customerService',
        'webtrekkApp.customerEdit',
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

    it('loads data on reveal',
        (inject(function ($controller, customerService, $routeParams) {
            $routeParams.id = 999;
            var spy = spyOn(customerService, 'get').and.returnValue(model);
            var ctrl = $controller('CustomerEditController');
            expect(spy).toHaveBeenCalledWith($routeParams.id);
            expect(ctrl.data).toEqual(model);
        })));

    it('clears location and navigates back when Cancel is clicked', (inject(function ($controller, $location) {
        var ctrl = $controller('CustomerEditController');
        var pathSpy = spyOn($location, 'path').and.callThrough();
        var searchSpy = spyOn($location, 'search');

        ctrl.cancel();

        expect(pathSpy).toHaveBeenCalledWith('/customerOverview');
        expect(searchSpy).toHaveBeenCalledWith('');
    })));

    it('performs correct update call when Save is clicked', inject(function ($controller, $location, customerService, $routeParams) {
        $routeParams.id = 999;
        spyOn(customerService, 'get').and.returnValue(model);
        var updateSpy = spyOn(customerService, 'update');
        var ctrl = $controller('CustomerEditController');
        var pathSpy = spyOn($location, 'path').and.callThrough();
        var searchSpy = spyOn($location, 'search');

        ctrl.update();

        expect(updateSpy).toHaveBeenCalledWith(model);
        expect(pathSpy).toHaveBeenCalledWith('/customerOverview');
        expect(searchSpy).toHaveBeenCalledWith('');
    }));

    describe('view', function () {
        var element, $scope;

        beforeEach(inject(function ($templateCache, $rootScope, $compile) {
            var tpl = $templateCache.get('customer-edit/customer-edit.html');
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
            expect(element.find('h2').text()).toEqual(i18nService.getString('customer.details'));
            expect(document.querySelector('.btn.btn-primary').innerText).toEqual(i18nService.getString('save'));
            expect(document.querySelector('.btn.btn-default').innerText).toEqual(i18nService.getString('cancel'));
        }));

        it('disables Update button when is-disabled two-way binding set to true', function () {
            var btn = document.querySelector('.btn.btn-primary');
            expect(btn.disabled).toBe(true);
            element.controller().isValid = true;
            $scope.$digest();
            expect(btn.disabled).toBe(false);
        })

    });


});