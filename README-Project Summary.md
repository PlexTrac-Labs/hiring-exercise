# User Admin Tool Project

## January 2022

### Overview

The user admin tool is a simple web application that demonstrates an administrative tool for maintaining user information in a database. Once logged in, administrators can add, change or delete users, as well as view details. Individuals without administrative privileges can only view user information. A register page provides the ability to create a new user account, and a reset password feature is also available.

### Development Environment, Frameworks and Tools

- Windows 10 Pro
- Visual Studio Code 1.63
- Postman 9.10
- React 17
- Docker Desktop 4.4.3
- AWS Elastic Container Service (ECS)
- AWS Simple Storage Service (S3)

### Bumps and Bruises

Encountered several challenges during the coding of this application:

- Hapi server incompatibility with Node 16x. I was running the latest version of Node and discovered that POST and PUT requests made to the Hapi API would hang with no response to the client. The good_file logging library was also throwing errors. Reverting to Node 14.18.3 corrected the problem. Reference https://github.com/hapijs/hapi/issues/4298 for more information.
- Had trouble getting Jest configured for automated unit testing of the frontend. The problems seemed to be Typescript-related, and I could not get the Jest test runner to execute the compiled application successfully. Eventually ran out of time and had to settle for basic API testing in Postman only.
- Was able to deploy both the Mongo database and Hapi API with Docker containers on AWS ECS. Tried to also deploy the frontend application as a third container, but could not get the frontend container to communicate with the API. Likely due to misconfigured TCP ports or something related to problems with container configuration. Abandoned the idea and ended up hosting the React frontend using an AWS S3 bucket.
- Was not able to complete the stretch goal for creating a CI/CD deployment infrastructure due to lack of time.

### Stretch Goals Completed

Was able to complete the following:

- Created tests for the API endpoints in Postman. Included an updated Postman collection with tests for each endpoint.
- Enforced authentication on protected endpoints using JWT authentication.
- Used Material-UI to style the React frontend.
- Used Docker to containerize the application. Created separate containers for the Mongo database, Hapi API and React frontend.
- Deployed the containerized database and API stack on AWS ECS.
- Deployed the React frontend web application on AWS S3.

### Additions and Changes to API

- Added logic to automatically seed the user table with a record for the admin account. This provides the ability to login with admin-level privileges the first time the API is run. The account is seeded with the following credentials:

`Email: admin@plextrac.com, Password: plextrac`

### Frontend/UI

The web application includes the following pages:

- Login
- New user registration
- Change password
- Navigation/landing page with options
- User list
- Add/edit user
- View user

Users without administrative privileges can view the list of users, but may not make any changes to the data.

### Public Web Site

The completed web application is accesible at the following address: http://plextrac-user-admin.systemsready.com

### Closing Thoughts

Overall, I felt the coding exercise was challenging and fun. Incompatibilities with Hapi and Node v16 proved frustrating and much time was lost in finding a resolution. Personal thanks to Winter for assisting in troubleshooting and finding a resolution using Node v14. Deployment on AWS ECS proved particularly challenging with respect to running multiple containers.
