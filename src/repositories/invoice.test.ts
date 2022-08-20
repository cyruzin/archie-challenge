import { Pool } from 'pg';
import { EInvoiceStats, IInvoice } from '../domain/invoice';
import { InvoiceRepository } from './invoice';

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

describe('invoice repository - getAll success', () => {
  test('should return all invoices', async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          id: 1,
          title: 'First Invoice',
          client_id: 1,
          user_id: 2,
          status: EInvoiceStats.APPROVED,
          total_amount: 5000,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          title: 'Another Invoice',
          client_id: 2,
          user_id: 3,
          status: EInvoiceStats.PENDING,
          total_amount: 300,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
    });
    await InvoiceRepository.getAll();
    expect(pool.query).toBeCalledTimes(1);
  });
});

describe('invoice repository - getByID success', () => {
  test('should return a invoice by ID', async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          id: 1,
          title: 'First Invoice',
          client_id: 1,
          user_id: 2,
          status: EInvoiceStats.APPROVED,
          total_amount: 5000,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
    });

    await InvoiceRepository.getByID(1);
    expect(pool.query).toBeCalledTimes(1);
  });
});

describe('invoice repository - create success', () => {
  test('should create a new invoice', async () => {
    pool.query.mockResolvedValue({ rows: [{ result: [{ id: 1 }] }] });

    const mockInvoice: IInvoice = {
      client_id: 1,
      user_id: 1,
      items: [
        {
          title: 'Invoice 4',
          description: 'Description of invoice 4',
          quantity: 2,
          rate: 200,
        },
        {
          title: 'Invoice 5',
          description: 'Description of invoice 5',
          quantity: 3,
          rate: 400,
        },
      ],
    };

    await InvoiceRepository.create(mockInvoice);
    expect(pool.query).toBeCalled();
  });
});

describe('invoice repository - update success', () => {
  test('should update a invoice', async () => {
    pool.query.mockResolvedValue({ rows: [] });

    const mockInvoice: IInvoice = {
      id: 1,
      client_id: 1,
      user_id: 1,
      status: EInvoiceStats.APPROVED,
      items: [
        {
          id: 1,
          title: 'Invoice 4',
          description: 'Description of invoice 4',
          quantity: 2,
          rate: 200,
        },
        {
          id: 2,
          title: 'Invoice 5',
          description: 'Description of invoice 5',
          quantity: 3,
          rate: 400,
        },
      ],
    };

    await InvoiceRepository.update(mockInvoice);
    expect(pool.query).toBeCalled();
  });
});

describe('invoice repository - remove success', () => {
  test('should remove a invoice', async () => {
    pool.query.mockResolvedValue({ rows: [] });

    await InvoiceRepository.remove(1);
    expect(pool.query).toBeCalledTimes(1);
  });
});
