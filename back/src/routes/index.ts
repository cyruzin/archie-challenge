import { Router, Request, Response } from 'express';
import ClientController from '../http/controllers/client';
import InvoiceController from '../http/controllers/invoice';
import UserController from '../http/controllers/user';

const router = Router();

router.get('/', function name(_req: Request, res: Response) {
  res.json({ welcome: 'Archie API' });
});

// client routes
router.get('/client', ClientController.getAll);
router.get('/client/:id', ClientController.getByID);
router.post('/client', ClientController.create);
router.put('/client/:id', ClientController.update);
router.delete('/client/:id', ClientController.remove);

// invoice routes
router.get('/invoice', InvoiceController.getAll);
router.get('/invoice/:id', InvoiceController.getByID);
router.post('/invoice', InvoiceController.create);
router.put('/invoice/:id', InvoiceController.update);
router.delete('/invoice/:id', InvoiceController.remove);

// user routes
router.get('/user', UserController.getAll);
router.get('/user/:id', UserController.getByID);
router.post('/user', UserController.create);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.remove);

export default router;
