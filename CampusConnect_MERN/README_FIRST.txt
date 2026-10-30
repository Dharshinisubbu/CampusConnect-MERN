CAMPUSCONNECT — MERN STACK CAMPUS EVENT PORTAL
================================================
Features
- Professional responsive student dashboard
- Search events and filter by category
- Bookmark events during the current browser session
- Register for events; registration count updates
- Create new campus events
- Express REST API
- MongoDB/Mongoose support, with sample-data demo mode if MongoDB is not available

REQUIREMENTS
- Node.js LTS installed
- Internet for the first npm install (to download packages)
- MongoDB is OPTIONAL. Without it, API starts in demo mode.

EASIEST START (VS CODE)
1. Extract this ZIP fully.
2. Open the extracted CampusConnect_MERN folder in VS Code.
3. Open Terminal > New Terminal. Run:
   npm run install:all
4. Open a SECOND terminal and run:
   npm run dev:server
   Wait until you see: CampusConnect API running at http://localhost:5000
5. In the FIRST terminal run:
   npm run dev:client
6. Open the Local URL Vite prints (usually http://localhost:5173).

IMPORTANT
- Keep both terminals running (server + client).
- If npm run install:all fails, run these separately from project root:
    npm install --prefix server
    npm install --prefix client
- Backend health check: http://localhost:5000/api/health
- Frontend: http://localhost:5173
- By default it works with sample data in demo mode; registration/event changes are in memory and reset when server restarts.
- For persistent database storage, copy server/.env.example to server/.env, ensure MongoDB is running, and set MONGO_URI. Then restart server.
- This demo does not include user authentication. Bookmarks are kept only in the current page session.

INTERVIEW SUMMARY
CampusConnect is a MERN-stack campus event portal designed to help students discover and join college activities. React provides the responsive UI, Express and Node.js expose REST API endpoints, and MongoDB with Mongoose can persist event records. It supports search, category filters, bookmarking, event registration and event creation. A demo mode allows the UI and API to run even if MongoDB is not configured.
