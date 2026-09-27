# my-api

A tiny Express REST API used to practice git worktrees and multi-agent development.

Based on [rwieruch/node-express-server-rest-api](https://github.com/rwieruch/node-express-server-rest-api).

## Run

```
npm install
npm start
```

Then open http://localhost:3000/users

## Routes

- `GET /users`, `GET /users/:userId`
- `GET /messages`, `GET /messages/:messageId`, `POST /messages`, `PUT /messages/:messageId`, `DELETE /messages/:messageId`
- `GET /session`

Data is stored in a SQLite database (`data.db` in the project root) using Node's built-in
`node:sqlite` module. The `users` and `messages` tables are created and seeded automatically
on first startup if they don't already exist, so data now persists across restarts. No auth yet.
