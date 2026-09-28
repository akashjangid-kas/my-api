import { DatabaseSync } from 'node:sqlite';
import path from 'path';

const db = new DatabaseSync(path.join(process.cwd(), 'data.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    text TEXT NOT NULL,
    userId TEXT NOT NULL
  )
`);

const userCount = db.prepare('SELECT COUNT(*) AS count FROM users').get().count;

if (userCount === 0) {
  const insertUser = db.prepare('INSERT INTO users (id, username) VALUES (?, ?)');
  insertUser.run('1', 'Robin Wieruch');
  insertUser.run('2', 'Dave Davids');
}

const messageCount = db.prepare('SELECT COUNT(*) AS count FROM messages').get().count;

if (messageCount === 0) {
  const insertMessage = db.prepare('INSERT INTO messages (id, text, userId) VALUES (?, ?, ?)');
  insertMessage.run('1', 'Hello World', '1');
  insertMessage.run('2', 'By World', '2');
}

export default db;
