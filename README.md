# Phone History Store
[![Build Status](https://travis-ci.org/nezago/phone-history-store-backend.svg?branch=develop)](https://travis-ci.org/nezago/phone-history-store-backend)  [![Coverage Status](https://coveralls.io/repos/github/nezago/phone-history-store-backend/badge.svg?branch=develop)](https://coveralls.io/github/nezago/phone-history-store-backend?branch=develop)  [![Test Coverage](https://api.codeclimate.com/v1/badges/d54e56e93e637a67bf50/test_coverage)](https://codeclimate.com/github/nezago/phone-history-store-backend/test_coverage)  [![Maintainability](https://api.codeclimate.com/v1/badges/d54e56e93e637a67bf50/maintainability)](https://codeclimate.com/github/nezago/phone-history-store-backend/maintainability)  [![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com)  [![Phone History Store](https://circleci.com/gh/nezago/phone-history-store-backend.svg?style=svg)](https://app.circleci.com/pipelines/github/nezago/phone-history-store-backend)


# Vision
Since the rise of technology has become one of the essential daily life dependency, mobile devices are one of the tools mostly used to facilitate access to the technology. Everyday we make calls to our family members, our friends and our mostly cherished lovers, we talk through phone calls, through short message service (also known as SMS), and there are sometimes we find ourselves in a need of recalling our sweet memories of what we talked with our friends in the past.

Here Phone History Store helps in that situation, you can store your sms, your call logs, and you phone book as well.

# Features

* User can see the welcome page

* User can create account.

* User can Login.
  
* User can see his/her profile.
  
* User can update his/her profile.
  
* User can delete his/her profile.

* User can sync his/her call logs.

* User can sync his/her sms.

* User can read his call logs wherever (his phone or his computer).

* User can edit the draft sms.

* User can delete sms.

* User can delete a call log.

# API Endpoints Specifications

- Api Roots : https://phone-history-store-backend.herokuapp.com/api/

| Endpoint | Request | Status | Description |
| --- | --- | --- | --- |
| / | GET | 200 OK | Helps users to access to the parent api for the whole application|
| /users/signup | POST | 201 CREATED | Makes a post request to signup a new user and return access token |
| /users/login | POST | 200 OK | Makes a post request to login an existing user and return an access token |
| /users/profile | GET | 200 OK | Makes a get request, to get a use's profile |
| /users/profile/:profileToUpdate | PATCH | 200 OK | Makes a patch request to update a logged in user |
| /users/:userId | delete | 200 OK | Makes a DELETE request, in order to currently logged in user's profile |
| /sms/save-sms | POST | 201 CREATED | Makes a POST request to save sms in database |
| /sms/read-my-sms | GET | 200 OK | Makes a GET request to retrieve all currently logged in user's sms |
| /sms/edit-sms/:id | PATCH | 200 OK | Makes a PATCH request, to update a specific draft sms  |
| /sms/delete-sms/:id | DELETE | 200 OK | Makes a DELETE request in order to delete a specific sms |
| /calls/save-call | POST | 201 CREATED | Makes a POST request to save a new call in database |
| /calls/read-my-calls | GET | 200 OK | Makes a GET request to retrieve all of my calls from database |
| /calls/delete-call/:callId | DELETE | 200 OK | Makes a DELETE request to delete a specific call from database |
| /users/check-user/:phoneNumber | GET | 200 OK | Makes a GET request to check if a user exists from database |
| /read-calls-by-device-source/:deviceSource | GET | 200 OK | Makes a GET request to retrieve calls from a specific device by providing device source id |
| /read-sms-by-device-source/:deviceSource | GET | 200 OK | Makes a GET request to retrieve sms from a specific device by providing device source id |
# Tools

Tools used for development of these APIs are;
- Code Editor: [VSCode](https://code.visualstudio.com/).
- Languages :
    * Backend:
        * [NodeJS](https://nodejs.org/en/) => [Express (framework)](https://expressjs.com/)
        * [PostgreSQL](https://www.postgresql.org/)

- API Testing tools: 
    * [Postman](https://www.getpostman.com/)
    * [Mocha](https://mochajs.org/) and [chai](https://www.chaijs.com/)

* Test Coverage, maintainability, and CI:
    * [Travis CI](https://travis-ci.org/ "Continuous Integration (CI)"), 
    * [Coverrals](https://coveralls.io/ "Test Coverrage") 
    * [Codeclimate](https://codeclimate.com/ "Code maintainability and Test coverage")
    * [Circle CI](https://circleci.com/ "Tests (Continuous Integration)")

* Version control system: [Git](https://git-scm.com/)

# Testing endpoint locally

### Prerequisites
Make sure you have:
- [NodeJS 13](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)

Clone the Repo.
-------------
1. `git clone https://github.com/nezago/phone-history-store-backend.git`
2. `cd phone-history-store-backend`
3. create a `.env` file in parent directory of the project 
4. copy all fields from `.env.example` file and paste them in `.env` file, and give them values
5. `yarn` or `npm i`
5. `yarn run migrations` or `npm run migrations`
6. `yarn start` or `npm start`
7. If you have [Postman](https://www.getpostman.com/) already installed on your local machine, then test all of the above listed endpoints
8. Remember to run [PostgreSQL 9 or above](https://www.postgresql.org/) on your local machine or in a container
   
## Deployment
- Heroku (Backend) : [Phone History Store Backend](https://phone-history-store-backend.herokuapp.com)

## Key contributor to development
* [MUGIRASE Emmanuel (descholar)](https://github.com/descholar-ceo/)