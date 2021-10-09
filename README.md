# Getting Start

## Pre-require:

ake sure u having Node.js installed.

Make sure google chrome extensions [Allow CORS: Access-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf) installed, and go to `Open options page` -> `Access-Control-Allow-Origin` and set it to `*` (Check [here](https://github.com/God-T/Online_store-Records-System/blob/master/cors-bypass.PNG) for more details)

## Clone this repo:

`git clone https://github.com/God-T/Online_store-Records-System.git`

## Run Backend as the following order:

-   ### `cd backend`

-   ### `npm install`
-   ### `npm start`

## Run Frontend as the following order:

-   ### `cd frontend`

-   ### `npm install`
-   ### `npm start`

\* Note theres a .db with simple testing examples that already exist in `/Backend/DB`,

if u want to reset to an empty db then simply run: `npm run db-reset`,

if db was deleted then run this to create a db: `npm run db-init`

# About Project

## Technologies:

This project is a WebApp about an online store application that records customers, products and customer purchases

the backend was built with `Node js`, `express js`, database was built with `knex js` + `sqlit3`, and runs on `http://localhost:5000`

the frontend was built with `React js`, and runs on `http://localhost:3000`

## Basic Functions:

-   list, add and delete products

-   list, add and delete customers

-   list, add and delete customers' purchases

## More Functions:

-   sort by tables headers

-   pagination ( page limit was set to 3 for easy testing )
