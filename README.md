# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & install Docker](https://www.docker.com/) and run it

## Installation

- Clone/download repo
- Switch to `logger-handler-auth` branch
- `npm install` - actually you need this only for service commands like `lint`, `test` etc. on your host machine
- Copy '.env.example` to `.env' and edit settings if you want

## Running application

Build images and run them in containers
```
npm run docker:compose
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

Next time you can use `docker-compose up` to run already build images.

PostgreSQL data catalog will be binded to `./database/data`, on the first run database will be created there. PostgreSQL logs are in `./database/data/log`. If you need to, you can stop containers, remove this folder and restart containers (`docker-compose up`). Database will be re-created, all migrations will be applied.

## Auth
* All routes except `auth/signup`, `auth/login`, `/auth/refresh`, `/doc`, `/`, `/test/reject`, `/test/exception` need HTTP Authorization header.
* Use `/auth/signup` to create user by login and password
* Use `/auth/login` to create access and refresh tokens by login and password
* Use `/auth/refesh` to refresh access token using refresh token
* Token timeouts can be changed in .env

## Logging
* Application logs will be saved in `./logs/`, that folder is also binded to docker container.
* Env variable `LOGGER_LEVEL` sets logging level. Valid levels are 'error', 'warn', 'log', 'verbose', 'debug'. ('debug' mean maximum information)
* Env variable `LOGGER_FILE_SIZE` set maximum log file size. After reaching that size log file will be renamed to `<logFileName>-<currentTime>.log`, and new `<logFileName>.log` will be used.
* All logs are stored in `app.log`, errors are additionaly stored in `error.log`. All messages also are send to `process.stdout`
* Default NestJs logger isn't changed and works as always.

---

**Don't forget, you need to run `npm install` for testing and using lint from your host machine. Also you can to it without `npm install`, running this from Docker container, see below**

## Testing

After application running open new terminal and enter:

To run all tests **in Auth mode, pay attention**
```
npm run test:auth
```

To run only one of all test suites
```
npm run test:auth -- <path to suite>
```

## Scan for security vulnerabilities

```
npm run docker:scan
```

## Check lint and format

Without fixing
```
npm run lint
```

With auto-fix
```
npm run lint:fix
```

Format
```
npm run format
```

## Testing etc without `npm install` from Docker container

Do to this just run command like
```
docker exec <app> npm run test
```
Where app is ID or Name of container. You can see them after running `docker container ls`. Name of api service of this app possibly will be `nodejs2022q4-service-api-1`, so the command will look like `docker exec nodejs2022q4-service-api-1 npm test` or by example id `docker exec aa9b827ebd96 npm test`.

Most of other npm commands can be run this way too.
