# Welcome to User Manager aka (PlexTrac's hiring exercise)!

## About my submission

For my submission I decided to use my favorite UX library Vuetify. I'm a big fan of the simplicity of Material Design so that was a no-brainer for me. I'm also a big fan of Vue in general. 

All of my components have UI tests to validate they render correctly and I was also able to implement the JWT authentication method for the endpoints that required it.

Finally, I dockerized the whole kit and kaboodle so running it is a breeze. (See 'Running my submission' below for proof)

Thanks a ton for the challenge. This was the most fun I've had with forms in awhile. I'm pretty sure I'm the first human to ever type that.

## System Setup

Install:

- Docker
- Docker Compose

### Running my submission

For the first build:
```bash
docker-compose build
```

For all other runs:
```bash
docker-compose up
```

The application (user-manager) will be running at http://localhost:8080.