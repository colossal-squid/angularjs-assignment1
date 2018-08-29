
# ASSIGNMENT:
Create a Single Page Application to edit user data based on local storage (no backend).
General requirements:
- Implemented in JavaScript using Angular.js, HTML/CSS (Bootstrap), with JavaScript tests
implemented using Jasmine
- Runs in the latest version of Chrome, Firefox and Internet Explorer
- Contains documentation (in the code)
- Contatains at least one test for every controller
Specification:
- The application starts with an Overview page listing all customers
- It contains a „Customer Detail View“ to create a customer and edit his profile data.
- It contains a „Navigation Data View“ that shows tracking data of the customer.
- The data is stored in local storage
- Initially (if the local storage is empty), it shall be initialised with the data from Appendix 1
"Master Data Table" and "Navigation Data Table"

# My comments on solution
The impl was started from angular-seed:

npm start - starts the app on localhost:8080
npm test - runs jasmine
(make sure you npm install before all these)
Bower is dead now, but still was a part of angularjs-seed in 2017 so yeah - not my fault really

List of things i definitely COULD do but didn't:
 - gulp task to concat/minify the production "bundle" into a single file/replace index.html with one that uses minified libs, pack html templates into a js file and so on
 - navigation-data.spec.js - Every test case I could do there - have their similar examples in other tests: verifying a table structure, navigation tests and so on
 - Customer Lifetime Value is LTV for short, not CLV as i put it everywhere - sorry about that
 - Service tests. The task says every CONTROLLER has a test + Services are real backend mocks here. But yeah, spyOn(ThatLocalStorageLibThingIUsed, 'set'/'put') - trivial
 - JSLINT - even if seed comes with one - I doubt it will pass.
- Little sorting arrow - I can do it. Put a button, ng-click, sort the collection - duh.

List of things I did instead, and I'm proud of:
- app internationalization. LOCALE should be a config-value of module, not a hardcoded string in i18n-service.
- tests for my filters/testing the template contents by rendering them - feels good :p
