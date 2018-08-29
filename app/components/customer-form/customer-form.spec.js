'use strict';

describe('Customer form component', function () {

    beforeEach(module('webtrekkApp.i18n', 'webtrekkApp.constants', 'webtrekkApp.customerForm'));

    it('Populates model onChanges', (inject(function ($componentController, appConst) {
        var model = {firstName: "Test", lastName: "Last"};
        var bindings = {
            customerFormMode: appConst.customerFormModes.EDIT,
            customerModel: model
        };
        var ctrl = $componentController('customerForm', {$scope: {}}, bindings);
        ctrl.$onChanges();
        expect(ctrl.model).toEqual(model);
    })));

    it('Throws error if customerFormMode is not set onChanges', (inject(function ($componentController) {
        var bindings = {};
        var ctrl = $componentController('customerForm', {$scope: {}}, bindings);
        expect(function () {
            ctrl.$onChanges();
        }).toThrow(new Error('CustomerComponentController: customerFormMode value was not specified!'));
    })));

    describe('Edit mode', function () {
        beforeEach(module('templates'));
        var element, $scope;

        // for (var file in window.__karma__.files) {
        //     console.log(file)
        // }

        beforeEach(inject(function ($compile, $rootScope, appConst) {
            $scope = $rootScope.$new();
            $scope.mode = appConst.customerFormModes.EDIT;
            $scope.model = {
                "id": 1,
                "firstName": "Peter",
                "lastName": "Smith",
                "dateOfBirth": "1996-10-12",
                "gender": "m",
                "lastContact": "2013-06-01",
                "clv": 191.12
            };
            element = angular.element(
                "<customer-form customer-model='model' customer-form-mode='" + $scope.mode + "' is-valid='isValid'></customer-form>");
            $scope.$apply(function () {
                $compile(element)($scope);
                angular.element(document.body).append(element);
            });
        }));

        afterEach(function () {
            angular.element(document.body).empty();
            $scope.$destroy();
        });

        it('Has correct form field labels', inject(function (i18nService) {
            var customerIdLbl = document.querySelector('label[for="customerId"]'),
                firstNameLbl = document.querySelector('label[for="firstName"]'),
                lastNameLbl = document.querySelector('label[for="lastName"]'),
                birdhdayLbl = document.querySelector('label[for="birthday"]'),
                genderLbl = document.querySelector('label[for="gender"]'),
                lastContactLbl = document.querySelector('label[for="lastContact"]'),
                clvLbl = document.querySelector('label[for="customerLifetimeValue"]');

            expect(customerIdLbl.innerText).toEqual(i18nService.getString('customerForm.id'))
            expect(firstNameLbl.innerText).toEqual(i18nService.getString('customerForm.firstName'));
            expect(lastNameLbl.innerText).toEqual(i18nService.getString('customerForm.lastName'));
            expect(birdhdayLbl.innerText).toEqual(i18nService.getString('customerForm.birthday'));
            expect(genderLbl.innerText).toEqual(i18nService.getString('customerForm.gender'));
            expect(lastContactLbl.innerText).toEqual(i18nService.getString('customerForm.lastContact'));
            expect(clvLbl.innerText).toEqual(i18nService.getString('customerForm.clv'));
        }));

        it('Populates form from customer-model', function () {
            var customerId = document.querySelector('#customerId'),
                firstName = document.querySelector('#firstName'),
                lastName = document.querySelector('#lastName'),
                birdhday = document.querySelector('#birthday'),
                gender = document.querySelector('#gender'),
                lastContact = document.querySelector('#lastContact'),
                clv = document.querySelector('#customerLifetimeValue');

            expect(Number(customerId.value)).toEqual($scope.model.id);
            expect(firstName.value).toEqual($scope.model.firstName);
            expect(lastName.value).toEqual($scope.model.lastName);
            expect(birdhday.value).toEqual($scope.model.dateOfBirth);
            // select.value will return string:m/string:w instead of m/w here. .toContain is a horrible choice, right?
            expect(gender.value).toContain($scope.model.gender);
            expect(lastContact.value).toEqual($scope.model.lastContact);
            expect(Number(clv.value)).toEqual($scope.model.clv);
        });

        it('Updates two-way is-valid binding when form is not valid', function () {
            var firstName = document.querySelector('#firstName'),
                lastName = document.querySelector('#lastName');
            expect($scope.isValid).toBe(true); //all fields are populated from the model
            firstName.value = '';
            firstName.dispatchEvent(new Event('input'));
            $scope.$digest();
            expect($scope.isValid).toBe(false); //First name is empty
            firstName.value = 'AnyName';
            firstName.dispatchEvent(new Event('input'));
            $scope.$digest();
            expect($scope.isValid).toBe(true); //First name is empty
        });

    });


});