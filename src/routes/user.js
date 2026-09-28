import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  const users = req.context.models.prepare('SELECT * FROM users').all();
  return res.send(users);
});

router.get('/:userId', (req, res) => {
  const user = req.context.models
    .prepare('SELECT * FROM users WHERE id = ?')
    .get(req.params.userId);
  return res.send(user);
});

export default router;
