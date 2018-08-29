/**
 * Contains Create/Update/Query operations for Customers
 */
angular.module('webtrekkApp.customerService', ['LocalStorageModule'])
    .service('customerService',
    ['localStorageService', 'appConst', '$filter',
        function (localStorageService, constants, $filter) {
            var ALL_CUSTOMERS_KEY = 'all_customers';
            var initialData = constants.initialCustomersPayload;

            //synchronously init with defaults
            if (!localStorageService.get(ALL_CUSTOMERS_KEY)) {
                var itemsByKey = {};
                initialData.forEach((item)=> {
                    itemsByKey[item.id] = item;
                });
                localStorageService.set(ALL_CUSTOMERS_KEY, itemsByKey);
            }

            var serviceInstance = {

                /**
                 * Retrieves all records
                 */
                getAll: function () {
                    return localStorageService.get(ALL_CUSTOMERS_KEY);
                },

                /**
                 * Retrieves customer by id given.
                 * Dates serialized as strings are parsed into javascript Date here
                 * @param id - customer#id
                 **/
                get: function (id) {
                    var record = localStorageService.get(ALL_CUSTOMERS_KEY)[id];
                    if (record) {
                        record.lastContact = new Date(record.lastContact);
                        record.dateOfBirth = new Date(record.dateOfBirth);
                    }
                    return record;
                },

                /**
                 * Removes a customer
                 * @param id - customer#id
                 */
                remove: function (id) {
                    var data = localStorageService.get(ALL_CUSTOMERS_KEY);
                    var rec = data[id];
                    data[id] = undefined;
                    delete data.id;
                    localStorageService.set(ALL_CUSTOMERS_KEY, data);
                    return rec;
                },

                /**
                 * Persists a new record
                 * @param record - customer model
                 */
                create: function (record) {
                    // this is not me demonstrating HOW GOOD I AM AT WRITING HIGH-PERFORMANCE code
                    // I do understand this is silly, but hey - auto increment, no matter what the input sequence was!
                    // (or i could save length and auto-increment it)
                    var ids = (Object.keys(localStorageService.get(ALL_CUSTOMERS_KEY)).map((item) => Number(item)) );
                    var record = angular.copy(record);
                    record.id = Math.max.apply(Math, ids) + 1;
                    var data = localStorageService.get(ALL_CUSTOMERS_KEY);
                    data[record.id] = record;
                    localStorageService.set(ALL_CUSTOMERS_KEY, data);
                },

                /**
                 * Persists a record passed, overwriting the original.
                 * The dates are expected to be javascript Date objects, and serialized using
                 * 'webtrekkApp.appConst#dateFormat' value as date format
                 * @param record - record to be persisted
                 */
                update: function (record) {
                    var record = angular.copy(record);
                    var data = localStorageService.get(ALL_CUSTOMERS_KEY);
                    var dateFilter = $filter('date');
                    record.dateOfBirth = dateFilter(record.dateOfBirth, constants.dateFormat);
                    record.lastContact = dateFilter(record.lastContact, constants.dateFormat);
                    data[record.id] = record;
                    localStorageService.set(ALL_CUSTOMERS_KEY, data);
                }

            };
            return serviceInstance;
        }]
);