# Getting Started

## System Setup

Install:

- Docker
- Docker Compose
- Node.js v14.5.0

### Running database

```bash
docker-compose up -d mongo
```

### Starting API

```bash
cd /path/to/your/forked/repo
npm install
npm run dev
```

### The task at hand...

You've just started at a new company, and your manager is greeting you in your cubicle, they look nervous.

After a brief "welcome to the team" the manager asks if you're ready to get started?

It turns out, another engineer just left suddenly without notice and has left an unfinished and buggy project that was supposed to launch this morning, yikes, what did you get yourself into?

Luckily, the previous developer left a Postman collection you should be able to use for viewing/interacting with all the API's current endpoints, `Hapi Server.postman_collection.json` will serve as your guide for now.

After assessing the situation you've identified the following prioritized list of tasks (in order of importance):

#### Showstoppers:

1. The previous developer did not build a user interface for the application, you'll need a user interface to interact with it, we recommend create-react-app as a starting point:
   1. Login page
   2. List users
   3. View a single user
   4. Delete a user
   5. Update a user
2. A couple of fields were left missing on the user records, we'll want to add:
   1. Birth year
   2. Favorite color
      1. These should be displayed when viewing a single user
3. Add a password reset page and API endpoints:
   1. Don't worry about e-mail notifications or one time password reset keys, just a page that allows a user to update their password
   2. Require the following fields:
      1. User ID
      2. Current password
      3. New password
      4. Repeat new password

#### Additional Details/Requirements:

The user interface should be created using one of the following frameworks:

- React
- Vue
- Angular

#### Items for extra credit:

- Include an automated testing suite that uses a common testing library such as Jasmine, Jest, or Mocha.
  - Keep it simple:
    - Test your logic, mock any third party services or dependencies
    - Give yourself some guard rails
    - Any UI tests can simply validate your components are rendering when properly initialized
- Enforce authentication for all API endpoints except: `/authenticate` and `/user/create`
  - Search the code for commented out: `auth: 'jwt'` as a starting point
  - Postman will also have some information on sending the `Authorization` header as a reference
- Use a modern UI/UX library such as Ant, Bootstrap, Angular Material, Vuetify, or Material-UI to implement the styling/components for your UI.
- Use Docker to containerize your application and run using the included docker-compose
- Include a CI/CD infrastructure using a common tool such as TeamCity, Travis CI, or Jenkins
- Deployed and host the app on one of the major cloud platforms
  - AWS
  - Azure
  - Google Cloud Platform

### Submission Instructions:

Please submit your code as a pull request to this repository, include @m4l1c3 and @badgerops as reviewers. Once submitted, you can use the calendly link in the invitation email to schedule some time to walk through the code and talk about your approach.

### Acknowledgements:

This exercise was built on top of the work of the wonderful @joshjconlin to put together a reference app.

This has been brought under the entity PlexTrac-Labs using the same license and includes enhancements specific to the organization.

Original repository: https://github.com/joshjconlin/hapi-19-typescript-server
