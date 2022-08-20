import { Pool } from 'pg';
import { IClient } from '../domain/client';
import { ClientRepository } from './client';

jest.mock('pg', () => {
  const mPool = {
    connect: function () {
      return { query: jest.fn() };
    },
    query: jest.fn(),
    end: jest.fn(),
    on: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

let pool: any;
beforeEach(() => {
  pool = new Pool();
});
afterEach(() => {
  jest.clearAllMocks();
});

describe('client repository - getAll success', () => {
  test('should return all clients', async () => {
    pool.query.mockResolvedValue({
      rows: [
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
      ],
    });
    await ClientRepository.getAll();
    expect(pool.query).toBeCalledTimes(1);
  });
});

describe('client repository - getByID success', () => {
  test('should return a client by ID', async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          id: 1,
          name: 'John Doe',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
    });

    await ClientRepository.getByID(1);
    expect(pool.query).toBeCalledTimes(1);
  });
});

describe('client repository - create success', () => {
  test('should create a new client', async () => {
    pool.query.mockResolvedValue({ rows: [] });

    const mockClient: IClient = {
      name: 'John Doe',
    };

    await ClientRepository.create(mockClient);
    expect(pool.query).toBeCalledTimes(1);
  });
});

describe('client repository - update success', () => {
  test('should update a client', async () => {
    pool.query.mockResolvedValue({ rows: [] });

    const mockClient: IClient = {
      name: 'John Doe',
    };

    await ClientRepository.update(mockClient);
    expect(pool.query).toBeCalledTimes(1);
  });
});

describe('client repository - remove success', () => {
  test('should remove a client', async () => {
    pool.query.mockResolvedValue({ rows: [] });

    await ClientRepository.remove(1);
    expect(pool.query).toBeCalledTimes(1);
  });
});
