# Rogue K9 Academy Web Application

RK9 monorepo source project, containing the frontend (ReactJS) and backend (Express API server).

# Required Software
- git
- Node.js
- MongoDB Compass (helpful)

## TLDR SETUP COMMANDS
**Run the following commands at the root of the project, in the following order:**
1) Contact me for mongo database uri information
2) npm install (inside of `packages/backend` and `packages/frontend`)
3) npm run start (inside of `packages/backend`)
4) npm run start (inside of `packages/frontend`)

**Continue reading below, for a more in-depth explanation on our setup.**

# Setup
1) Install backend package dependencies
```
cd packages/backend
npm install
```
2) Install frontend package dependencies
```
cd ../frontend
npm install
```

### Backend 
To get the RK9 backend stack up, please contact me for the mongo database uri.

1) Add mongodb uri and port to your own `.env` file in `packages/backend`
```
MONGODB_URI=<provided_uri>
PORT=7777
```
2) Start backend
```
npm run start
```

### Frontend
You can now run the frontend in `packages/frontend`, once the backend is running.

1. Start frontend
```
cd ../frontend
npm run start
```

2. The browser should automatically load, but if not, open `localhost:3000` in your browser to view live updates.
