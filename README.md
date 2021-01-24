# CSc 322 - Software Engineering Restaurant Application Project

## Overview

The goal of this project was to create a web app for a resturant. Functionality was created for First-Time Visitors, Customers, VIP Customers, Chefs, Drivers, and Managers. React was used for the core functionality of the app and Cloud Firestore (Google Firebase) was used as the database to store necessary information. Additionally, a live version of the website, hosted via Amazon Web Services (AWS) can be found [here.](https://master.d1v9tmlnzqp25u.amplifyapp.com/Home) Specific functionality for each user is outlined in the project requirements section.

## Project Requirements

### System Users

There are three groups of users in this system:

#### Resturant

- [x] At least two chefs who independently decide the menus
- [x] At least two delivery people who compete for food deliery
- [x] The manager/superuser who process customer registrations, handles customer compliments and complaints, hire/fire/raise or cut pay for chef(s) and deliver people

#### Customers

- [x] Registered customers can browse/search, order and vote (lowest 1 star to highest 5 stars) food delivered (on food and delivery quality/manners individually).
- [x] They can start/participate a discussion topic on cooks/dishes/deliver people.

- [x] Registered customers who spent more than $500 or placed 50 orders, whichever comes first, are promoted to VIP customers
- [x] In addition to the actions of registered customers, they will receive 10% discount of their ordinary orders, have access to specially developed dishes, and their complaints/compliments are counted twice as important as ordinary ones. 

#### Surfers

- [x] Can browse the menus and ratings only.
- [x] Can apply to be the registered customers with fixed amount of deposit money and checked by the manager.

### System Features

- [x] Provide a GUI, not necessarily web-based, with pictures to show the components and descriptions of each dish and price
- [x] Each registered customer/VIP has a password to login, when they log in, based on the history of their prior choices, different registered customer/VIP will have different top 3 listing dishes.
- [x] For new customers or surfers, the top 3 most popular (ordered most) dishes and top 3 highest rated dishes are listed on the page.
- [x] The chef whose dishes received consistently low ratings or 3 complaints, or no order at all for 3 days, will be demoted (less salsary), a chef demoted twice is fired.
- Handled manually by the manager
- [x] Conversely, a chef whose dishes received high ratings or 3 compliments, will be promoted (higher salary). One compliment can be used to cancel one complaint. The delivery people are handled the same way.
- [x] A customer can choose to ~~1) eat the food in the resturant,~~ 2) pick up the dishes by self or 3) by delivery. For 1) s/he need to fix the available time and seating in the resturant; for case 1) and 2) s/he can only complain/compliment the chef.
- Indoor dining not available due to covid-19
- [x] Customers can file complaints/compliments to chef of the food s/he purchased and deliver person who delivered the dish or other customers who didn’t behave in the discussion forums. 
- [x] Delivery person can complain/compliment customers s/he delivered dishes, all are handled by the manager. 
- [x] The complained person has the right to dispute the complaint, the manager made the final call to dismiss the complaint or convert it to one formal warning and inform the impacted parties. 
- [x] Customers/delivery people whose complaints are decided without merit by the manager will receive one warning.
- [x] Registered customers having 3 warnings are de-registered. 
- [x] VIPs having 2 warnings are put back to registered customers (with warnings cleared). 
- [x] The warnings should be displayed in the personalized page when the customers log in.
- [x] If the price of the order is more expensive than the deposited money in the account, the order is frozen until the customer put more money in the account.
- [x] Customers who are kicked out of the system or choose to quit the system will be handled by the manager: clear the deposit and close the account.
- [x] The chef is the one who put in the description and keywords for people to browse. 
- [x] The average ratings for each food/dish by customers are available for all. 
- [x] The manager keeps a taboo list of words, any customer who used those taboo words will receive one warning automatically and the words are replaced by \*\*\*, a message with more than 3 taboo words are blocked automatically. 
- [x] Each team comes up with a creativity feature of the system to make it more exciting, which is worth 10% of overall score of the final project. 
- [x] Details that are not found in this requirement list are up to your team’s call: you fill in the details to your own liking.

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### Cloning the Repository

To save the project locally, clone it by running the following in the terminal of your choice:<br />
 ```
 git clone https://github.com/aahmed019/CSC322-Project.git
 ```

### `npm install`

npm install downloads a package and it's dependencies.<br />
It install can be run with or without arguments. <br />
When run without arguments, npm install downloads dependencies defined in a package.json file and generates a node_modules folder with the installed modules.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

## Authors

- Ali Ahmed
- Phyo Zaw Hein
- Eram Manasia
- Mitchell Mui
- Ravid Rahman
