/**
 * Data-service for navigation data
 */
angular.module('webtrekkApp.navigationDataService',[]).service('navigationDataService',
    ['appConst',
        function (constants) {

            return {
                /**
                 * I've decided to not play with local storage here since this data is readonly anyways
                 */
                getData: function (customerId) {
                    return constants.navigationData.filter(i=>i.customerId === customerId);
                }
            }

        }]);