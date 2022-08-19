import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', function name(_req: Request, res: Response) {
  res.json({ welcome: 'Archie API' });
});

// users routes
// router.get('/users', UsersController.getAll);
// router.get('/users/:id', UsersController.getByID);
// router.post('/users', UsersController.create);
// router.put('/users/:id', UsersController.update);
// router.delete('/users/:id', UsersController.remove);

// students routes
// router.get('/students', StudentsController.getAll);
// router.get('/students/:id', StudentsController.getByID);
// router.post('/students', StudentsController.create);
// router.put('/students/:id', StudentsController.update);
// router.delete('/students/:id', StudentsController.remove);

export default router;
