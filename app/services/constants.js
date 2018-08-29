/**
 * App-level constants
 * Could be split into multiple files to make it more scalable
 * But on a current feature-set - Guess single file is OK
 */
angular.module('webtrekkApp.constants',[]).constant('appConst', {
    /**
     * webtrekkApp.customerForm#customerFormMode valid values
     */
    customerFormModes: {
        EDIT: 'edit',
        CREATE: 'create'
    },
    /**
     * Date format used for dateOfBirth/lastContact dates.
     * I suppose passing this as a .value to a module,
     * making it a 'config' sort of thing would make more sense, but constant is fine with me as well
     */
    dateFormat: 'yyyy-MM-dd',
    /**
     * Initial values used in webtrekkApp.customerService
     * I could put these into a separate json, request them in the service itself, somewhere in constructor function,
     * then I would have to avoid race conditions when .getAll is called before response is received,
     * so probably I would end up returning promises everywhere.
     * PROS: That way i could show you I can perform XHR requests and use built-in $q service
     * CONS: More complexity.
     *
     * I vote for less complexity. This task isn't a 1 hour task anyway
     */
    initialCustomersPayload: [
        {
            "id": 1,
            "firstName": "Peter",
            "lastName": "Smith",
            "dateOfBirth": "1996-10-12",
            "gender": "m",
            "lastContact": "2013-06-01",
            "clv": 191.12
        },
        {
            "id": 2,
            "firstName": "Anna",
            "lastName": "Hopp",
            "dateOfBirth": "1987-05-03",
            "gender": "w",
            "lastContact": "2013-07-08",
            "clv": 50.99
        },
        {
            "id": 3,
            "firstName": "Christian",
            "lastName": "Cox",
            "dateOfBirth": "1991-02-21",
            "gender": "m",
            "lastContact": "2013-08-01",
            "clv": 0
        },
        {
            "id": 4,
            "firstName": "Roxy",
            "lastName": "Fox",
            "dateOfBirth": "1979-06-30",
            "gender": "w",
            "lastContact": "2012-01-29",
            "clv": 12
        },
        {
            "id": 5,
            "firstName": "Eric",
            "lastName": "Adam",
            "dateOfBirth": "1969-11-21",
            "gender": "m",
            "lastContact": "2013-03-18",
            "clv": 91
        }
    ],
    navigationData: [
        {"customerId": 1, "page": "A", "timestamp": "2013-06-01	10:10:12"},
        {"customerId": 1, "page": "B", "timestamp": "2013-06-01	10:11:12"},
        {"customerId": 1, "page": "A", "timestamp": "2013-06-01	10:12:12"},
        {"customerId": 2, "page": "C", "timestamp": "2013-07-08	09:03:09"},
        {"customerId": 2, "page": "A", "timestamp": "2013-07-08	09:09:09"},
        {"customerId": 2, "page": "D", "timestamp": "2013-07-08	09:19:09"},
        {"customerId": 3, "page": "B", "timestamp": "2013-07-08	09:19:09"},
        {"customerId": 3, "page": "A", "timestamp": "2013-07-08	09:19:10"},
        {"customerId": 4, "page": "D", "timestamp": "2013-07-08	09:19:11"},
        {"customerId": 4, "page": "A", "timestamp": "2013-07-08	09:19:12"},
        {"customerId": 5, "page": "X", "timestamp": "2013-07-08	09:19:13"},
        {"customerId": 5, "page": "A", "timestamp": "2013-07-08	09:19:14"},
        {"customerId": 5, "page": "B", "timestamp": "2013-07-08	09:19:15"}
    ]
});
