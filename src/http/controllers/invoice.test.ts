import { EInvoiceStats, IInvoice } from '../../domain/invoice';
import { InvoiceService } from '../../services/invoice';
import InvoiceController from './invoice';

describe('invoice controller - getAll success', () => {
  test('should return all invoices', async () => {
    const mockInvoices: IInvoice[] = [
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
    ];

    InvoiceService.getAll = jest.fn(() => Promise.resolve(mockInvoices));

    const req: any = {};
    const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn(), json: jest.fn() };

    await InvoiceController.getAll(req, res);

    expect(InvoiceService.getAll).toBeCalledTimes(1);
  });
});

describe('invoice controller - getByID success', () => {
  test('should return a invoice by id', async () => {
    const mockInvoice: IInvoice = {
      id: 1,
      title: 'First Invoice',
      client_id: 1,
      user_id: 2,
      status: EInvoiceStats.APPROVED,
      total_amount: 5000,
      created_at: new Date(),
      updated_at: new Date(),
    };

    InvoiceService.getByID = jest.fn(() => Promise.resolve(mockInvoice));

    const req: any = { params: { id: 1 } };
    const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn(), json: jest.fn() };

    await InvoiceController.getByID(req, res);

    expect(InvoiceService.getByID).toBeCalledTimes(1);
  });
});

describe('invoice controller - create success', () => {
  test('should create a new invoice', async () => {
    InvoiceService.create = jest.fn(() => Promise.resolve());

    const req: any = {
      body: {
        title: 'First Invoice',
        client_id: 1,
        user_id: 2,
        total_amount: 5000,
      },
    };
    const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn(), json: jest.fn() };

    await InvoiceController.create(req, res);

    expect(InvoiceService.create).toBeCalledTimes(1);
  });
});

describe('invoice controller - update success', () => {
  test('should update a invoice', async () => {
    InvoiceService.update = jest.fn(() => Promise.resolve());

    const req: any = {
      params: { id: 1 },
      body: {
        title: 'First Invoice',
        client_id: 1,
        user_id: 2,
        status: EInvoiceStats.APPROVED,
        total_amount: 5000,
      },
    };
    const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn(), json: jest.fn() };

    await InvoiceController.update(req, res);

    expect(InvoiceService.update).toBeCalledTimes(1);
  });
});

describe('invoice controller - remove success', () => {
  test('should remove a invoice', async () => {
    InvoiceService.remove = jest.fn(() => Promise.resolve());

    const req: any = {
      params: { id: 1 },
    };
    const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn(), json: jest.fn() };

    await InvoiceController.remove(req, res);

    expect(InvoiceService.remove).toBeCalledTimes(1);
  });
});
