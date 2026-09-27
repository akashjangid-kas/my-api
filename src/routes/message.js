import { v4 as uuidv4 } from 'uuid';
import { Router } from 'express';

const router = Router();

const isValidText = (text) => typeof text === 'string' && text.trim().length > 0;

router.get('/', (req, res) => {
  return res.send(Object.values(req.context.models.messages));
});

router.get('/:messageId', (req, res) => {
  return res.send(req.context.models.messages[req.params.messageId]);
});

router.post('/', (req, res) => {
  if (!isValidText(req.body.text)) {
    return res.status(400).send({ error: 'Message text is required' });
  }

  const id = uuidv4();
  const message = {
    id,
    text: req.body.text.trim(),
    userId: req.context.me.id,
  };

  req.context.models.messages[id] = message;

  return res.send(message);
});

router.delete('/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = req.context.models.messages;

  req.context.models.messages = otherMessages;

  return res.send(message);
});

router.put('/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message
  } = req.context.models.messages;

  if (!message) {
    return res.status(404).send({ error: 'Message not found' });
  }

  if (!isValidText(req.body.text)) {
    return res.status(400).send({ error: 'Message text is required' });
  }

  const updatedMessage = {
    ...message,
    text: req.body.text.trim()
  };

  req.context.models.messages[req.params.messageId] = updatedMessage;

  return res.send(updatedMessage);
})

export default router;
