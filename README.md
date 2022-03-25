# Rogue K9 Academy Web Application

RK9 monorepo source project, containing the frontend (ReactJS) and backend (Express API server).


## Development & Operations:

RK9 Webapp is currently broken into three services: a backend, a frontend, and a database service. These services are containerized for development and production purposes. Below, you can lean more on how you can use the provided `Makefile` for your development operations.

### Service Requirements
 - Docker (Or OCI complaint agent)
 - make
 - git

## Getting Started

1. Clone the repo and enter base directory:

```bash
git clone gitlab/rk9/rk9-webapp.git
cd rk9-webapp
```

2. Move from the base directory to the backend directory via `cd packages/backend`, and run `npm ci`. Then, move to the frontend directory via `../frontend`, and again run `npm ci`. Return to the base directory via `../..`

3. Build the backend, frontend, and database service containers on your localhost. This will take a few minutes to complete:
```bash
make build
```

4. Run the services on your localhost, to see live updates as you develop. This will take a few minutes to complete:
```bash
make serve
```

5. Open `localhost:3000` on your web browser to view the application.


## Utilizing Makefile

### To run any unit test or integration test, if desired:
```
make unit-test
make integration-test
```

### To investigate backend service logs:
```
make logs-backend
```

### To update `package-lock.json` files for services, if you update any `package.json` files:
```
make update-package-locks
```
