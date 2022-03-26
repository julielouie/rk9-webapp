# Rogue K9 Academy Web Application

RK9 monorepo source project, containing the frontend (ReactJS) and backend (Express API server).

## TLDR SETUP COMMANDS
**Run the following commands at the root of the project, in the following order:**
1) ./setup.sh
2) npm run build:docker
3) npm run dev:docker
4) cd packages/frontend && npm start

**Continue reading below for a more in-depth explanation on our setup**

# Setup
1) Install root dependencies
```
$ npm ci
```

2) Install package dependencies
```
$ lerna bootstrap
```

### Backend 
To get the RK9 backend stack up in a short time, the use of docker is recommended. We utilize docker images for mongo, and containerize our REST api.

1) Build docker images
```
$ npm run build:docker
```
or
```
docker-compose build
```

2) Run the project:
```
$ npm run dev:docker
```
or
```
docker-compose up
```

### Frontend
You can now run the frontend, once the backend is running.

1. Start frontend
```
$ cd packages/frontend
$ npm run start
```

2. Open `localhost:3000` in your browser to view live updates.
