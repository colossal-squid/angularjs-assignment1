/**
 * Reusable customer form component
 * @see webtrekkApp.appConst for Supported customerFormMode values
 */
angular.module('webtrekkApp.customerForm', ['webtrekkApp.constants', 'webtrekkApp.i18n']).component(
    'customerForm', {
        templateUrl: 'app/components/customer-form/customer-form.html',
        bindings: {
            customerFormMode: '@', // mandatory
            customerModel: '=', // required for edit only,
            isValid: '='
        },
        controller: ['appConst', 'i18nService', '$scope',
            function CustomerComponentController(constants, i18nService, $scope) {

                var modes = constants.customerFormModes;
                var vm = this;

                this.model = {};
                this.i18n = i18nService.getString;
                this.genders = [
                    {id: 'w', name: this.i18n('gender.female')},
                    {id: 'm', name: this.i18n('gender.male')}
                ];
                this.format = constants.dateFormat;
                // angular-ui datepicker config.
                this.dateOptions = {
                    formatYear: 'yy',
                    maxDate: new Date(),
                    startingDay: 1
                };

                this.birthdayDatepickerOpened = false;
                this.lastContactDatepickerOpened = false;

                // shows birthday datepicker popup
                this.openBirthdayDatepicker = function () {
                    vm.birthdayDatepickerOpened = true;
                    console.log(vm.birthdayDatepickerOpened);
                };

                // shows birthday last contact datepicker popup
                this.openLastContactDatepicker = function () {
                    vm.lastContactDatepickerOpened = true;
                };

                this.$onChanges = function () {
                    if (!this.customerFormMode) {
                        throw new Error('CustomerComponentController: customerFormMode value was not specified!');
                    }
                    this.model = this.customerModel;
                };

                /**
                 * Injecting $scope into a component kills the whole point of using a component.
                 * Couldn't find out a better solution fast enough - we can discuss it if the interview happens
                 */
                this.$postLink = function () {
                    vm.isValid = modes.EDIT === vm.customerFormMode;

                    $scope.$watch(function () {
                        return vm.form.$invalid;
                    }, function (newVal, oldVal) {
                        if (oldVal !== newVal) {
                            vm.isValid = !newVal;
                        }
                    });
                }
            }]
    });