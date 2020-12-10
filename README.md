# CSc 322 - Software Engineering Resturant Application Project

## Overview

The goal of this project was to create a web app for a resturant. Functionality was created for First-Time Visitors, Customers, VIP Custoemrs, Chefs, Drivers, and Managers. React was used for the core functionality of the app and Cloud Firestore (Google Firebase) was used as the database to store necessary information. Additionally, a live version of the website, hosted via Amazon Web Services (AWS) can be found [here.](https://master.d1v9tmlnzqp25u.amplifyapp.com/Home) Specific functionality for each user is outlined in the project requirements section.

## Project Requirements

### System Users

There are three groups of users in this system:

#### Resturant

- [x] At least two chefs who independently decide the menus
- [ ] At least two delivery people who compete for food deliery
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

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

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
- Eram Ma
- Mitchu Mui
- Ravid Rahman
