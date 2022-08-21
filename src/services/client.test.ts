import { IClient } from '../domain/client';
import { ClientService } from './client';
import { ClientRepository } from '../repositories/client';

describe('client service - getAll success', () => {
  test('should return all clients', async () => {
    const mockClient: IClient[] = [
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

    ClientRepository.getAll = jest.fn(() => Promise.resolve(mockClient));

    const res = await ClientService.getAll();

    expect(res[0].name).toBe('John Doe');
    expect(res[1].name).toBe('Jane Doe');

    expect(ClientRepository.getAll).toBeCalledTimes(1);
  });
});

describe('client service - getAll failure', () => {
  test('should fail to return all clients', async () => {
    ClientRepository.getAll = jest.fn(() => {
      throw new Error('failed to retrieve the clients');
    });

    try {
      await ClientService.getAll();
    } catch (err) {
      expect(err.message).toEqual('failed to retrieve the clients');
    }
  });
});

describe('client service - getByID success', () => {
  test('should return a client by id', async () => {
    const mockClient: IClient = {
      id: 1,
      name: 'John Doe',
      created_at: new Date(),
      updated_at: new Date(),
    };

    ClientRepository.getByID = jest.fn(() => Promise.resolve(mockClient));

    const res = await ClientService.getByID(1);

    expect(res.name).toBe('John Doe');

    expect(ClientRepository.getByID).toBeCalledTimes(1);
  });
});

describe('client service - getByID failure', () => {
  test('should fail to return a client by id', async () => {
    ClientRepository.getByID = jest.fn(() => {
      throw new Error('failed to retrieve the client');
    });

    try {
      await ClientService.getByID(1);
    } catch (err) {
      expect(err.message).toEqual('failed to retrieve the client');
    }
  });
});

describe('client service - create success', () => {
  test('should create a new client', async () => {
    const mockClient: IClient = {
      name: 'John Doe',
    };

    ClientRepository.create = jest.fn(() => Promise.resolve());

    await ClientService.create(mockClient);

    expect(ClientRepository.create).toBeCalledTimes(1);
  });
});

describe('client service - create failure', () => {
  test('should fail to create a new client', async () => {
    const mockClient: IClient = {
      name: 'John Doe',
    };

    ClientRepository.create = jest.fn(() => {
      throw new Error('failed to create the client');
    });

    try {
      await ClientService.create(mockClient);
    } catch (err) {
      expect(err.message).toEqual('failed to create the client');
    }
  });
});

describe('client service - update success', () => {
  test('should update a client', async () => {
    const mockClient: IClient = {
      id: 1,
      name: 'Pedro Rocha',
    };

    ClientRepository.getByID = jest.fn(() => Promise.resolve(mockClient));
    ClientRepository.update = jest.fn(() => Promise.resolve());

    await ClientService.update(mockClient);

    expect(ClientRepository.update).toBeCalledTimes(1);
  });
});

describe('client service - update failure', () => {
  test('should fail to update a client', async () => {
    const mockClient: IClient = {
      id: 1,
      name: 'John Doe',
    };

    ClientRepository.update = jest.fn(() => {
      throw new Error('failed to update the client');
    });

    try {
      await ClientService.update(mockClient);
    } catch (err) {
      expect(err.message).toEqual('failed to update the client');
    }
  });
});

describe('client service - remove success', () => {
  test('should remove a client', async () => {
    const mockClient: IClient = {
      id: 1,
      name: 'John Doe',
      created_at: new Date(),
      updated_at: new Date(),
    };

    ClientRepository.getByID = jest.fn(() => Promise.resolve(mockClient));
    ClientRepository.remove = jest.fn(() => Promise.resolve());

    await ClientService.remove(1);

    expect(ClientRepository.remove).toBeCalledTimes(1);
  });
});

describe('client service - remove failure', () => {
  test('should fail to remove a client', async () => {
    ClientRepository.remove = jest.fn(() => {
      throw new Error('failed to remove the client');
    });

    try {
      await ClientService.remove(1);
    } catch (err) {
      expect(err.message).toEqual('failed to remove the client');
    }
  });
});
