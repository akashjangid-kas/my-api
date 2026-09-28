import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  const user = req.context.models
    .prepare('SELECT * FROM users WHERE id = ?')
    .get(req.context.me.id);
  return res.send(user);
});

export default router;
