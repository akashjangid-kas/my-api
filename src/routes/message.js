import { v4 as uuidv4 } from 'uuid';
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  const messages = req.context.models.prepare('SELECT * FROM messages').all();
  return res.send(messages);
});

router.get('/:messageId', (req, res) => {
  const message = req.context.models
    .prepare('SELECT * FROM messages WHERE id = ?')
    .get(req.params.messageId);
  return res.send(message);
});

router.post('/', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.context.me.id,
  };

  req.context.models
    .prepare('INSERT INTO messages (id, text, userId) VALUES (?, ?, ?)')
    .run(message.id, message.text, message.userId);

  return res.send(message);
});

router.delete('/:messageId', (req, res) => {
  const message = req.context.models
    .prepare('SELECT * FROM messages WHERE id = ?')
    .get(req.params.messageId);

  req.context.models
    .prepare('DELETE FROM messages WHERE id = ?')
    .run(req.params.messageId);

  return res.send(message);
});

router.put('/:messageId', (req, res) => {
  const message = req.context.models
    .prepare('SELECT * FROM messages WHERE id = ?')
    .get(req.params.messageId);

  const updatedMessage = {
    ...message,
    text: req.body.text,
  };

  req.context.models
    .prepare('UPDATE messages SET text = ? WHERE id = ?')
    .run(updatedMessage.text, req.params.messageId);

  return res.send(updatedMessage);
});

export default router;
