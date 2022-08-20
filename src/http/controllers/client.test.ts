import { IClient } from '../../domain/client';
import { ClientService } from '../../services/client';
import ClientController from './client';

describe('client controller - getAll success', () => {
  test('should return all clients', async () => {
    const mockClients: IClient[] = [
      {
        id: 1,
        name: 'John Doe',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'Jane Doe',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    ClientService.getAll = jest.fn(() => Promise.resolve(mockClients));

    const req: any = {};
    const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn(), json: jest.fn() };

    await ClientController.getAll(req, res);

    expect(ClientService.getAll).toBeCalledTimes(1);
  });
});

describe('client controller - getByID success', () => {
  test('should return a client by id', async () => {
    const mockClient: IClient = {
      id: 1,
      name: 'John Doe',
      created_at: new Date(),
      updated_at: new Date(),
    };

    ClientService.getByID = jest.fn(() => Promise.resolve(mockClient));

    const req: any = { params: { id: 1 } };
    const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn(), json: jest.fn() };

    await ClientController.getByID(req, res);

    expect(ClientService.getByID).toBeCalledTimes(1);
  });
});

describe('client controller - create success', () => {
  test('should create a new client', async () => {
    ClientService.create = jest.fn(() => Promise.resolve());

    const req: any = {
      body: {
        name: 'John Doe',
      },
    };
    const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn(), json: jest.fn() };

    await ClientController.create(req, res);

    expect(ClientService.create).toBeCalledTimes(1);
  });
});

describe('client controller - update success', () => {
  test('should update a client', async () => {
    ClientService.update = jest.fn(() => Promise.resolve());

    const req: any = {
      params: { id: 1 },
      body: {
        name: 'John Doe',
      },
    };
    const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn(), json: jest.fn() };

    await ClientController.update(req, res);

    expect(ClientService.update).toBeCalledTimes(1);
  });
});

describe('client controller - remove success', () => {
  test('should remove a client', async () => {
    ClientService.remove = jest.fn(() => Promise.resolve());

    const req: any = {
      params: { id: 1 },
    };
    const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn(), json: jest.fn() };

    await ClientController.remove(req, res);

    expect(ClientService.remove).toBeCalledTimes(1);
  });
});
