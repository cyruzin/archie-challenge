import { IInvoice } from '../domain/invoice';
import { InvoiceService } from './invoice';
import { InvoiceRepository } from '../repositories/invoice';

describe('invoice service - getAll success', () => {
  test('should return all invoices', async () => {
    const mockInvoice: IInvoice[] = [
      {
        id: 1,
        title: 'First Invoice',
        client_id: 1,
        user_id: 2,
        status: 'APPROVED',
        total_amount: 5000,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        title: 'Another Invoice',
        client_id: 2,
        user_id: 3,
        status: 'PENDING',
        total_amount: 300,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    InvoiceRepository.getAll = jest.fn(() => Promise.resolve(mockInvoice));

    const res = await InvoiceService.getAll();

    expect(res[0].status).toBe('APPROVED');
    expect(res[1].status).toBe('PENDING');

    expect(InvoiceRepository.getAll).toBeCalledTimes(1);
  });
});

describe('invoice service - getAll failure', () => {
  test('should fail to return all invoices', async () => {
    InvoiceRepository.getAll = jest.fn(() => {
      throw new Error('failed to retrieve the invoices');
    });

    try {
      await InvoiceService.getAll();
    } catch (err: any) {
      expect(err.message).toEqual('failed to retrieve the invoices');
    }
  });
});

describe('invoice service - getByID success', () => {
  test('should return a invoice by id', async () => {
    const mockInvoice: IInvoice = {
      id: 1,
      title: 'First Invoice',
      client_id: 1,
      user_id: 2,
      status: 'APPROVED',
      total_amount: 5000,
      created_at: new Date(),
      updated_at: new Date(),
    };

    InvoiceRepository.getByID = jest.fn(() => Promise.resolve(mockInvoice));

    const res = await InvoiceService.getByID(1);

    expect(res.status).toBe('APPROVED');

    expect(InvoiceRepository.getByID).toBeCalledTimes(1);
  });
});

describe('invoice service - getByID failure', () => {
  test('should fail to return a invoice by id', async () => {
    InvoiceRepository.getByID = jest.fn(() => {
      throw new Error('failed to retrieve the invoice');
    });

    try {
      await InvoiceService.getByID(1);
    } catch (err: any) {
      expect(err.message).toEqual('failed to retrieve the invoice');
    }
  });
});

describe('invoice service - create success', () => {
  test('should create a new invoice', async () => {
    const mockInvoice: IInvoice = {
      title: 'First Invoice',
      client_id: 1,
      user_id: 2,
      status: 'APPROVED',
      total_amount: 5000,
    };

    InvoiceRepository.create = jest.fn(() => Promise.resolve());

    await InvoiceService.create(mockInvoice);

    expect(InvoiceRepository.create).toBeCalledTimes(1);
  });
});

describe('invoice service - create failure', () => {
  test('should fail to create a new invoice', async () => {
    const mockInvoice: IInvoice = {
      title: 'First Invoice',
      client_id: 1,
      user_id: 2,
      status: 'APPROVED',
      total_amount: 5000,
    };

    InvoiceRepository.create = jest.fn(() => {
      throw new Error('failed to create the invoice');
    });

    try {
      await InvoiceService.create(mockInvoice);
    } catch (err: any) {
      expect(err.message).toEqual('failed to create the invoice');
    }
  });
});

describe('invoice service - update success', () => {
  test('should update a invoice', async () => {
    const mockInvoice: IInvoice = {
      id: 1,
      title: 'First Invoice',
      client_id: 1,
      user_id: 2,
      status: 'APPROVED',
      total_amount: 5000,
    };

    InvoiceRepository.getByID = jest.fn(() => Promise.resolve(mockInvoice));
    InvoiceRepository.update = jest.fn(() => Promise.resolve());

    await InvoiceService.update(mockInvoice);

    expect(InvoiceRepository.update).toBeCalledTimes(1);
  });
});

describe('invoice service - update failure', () => {
  test('should fail to update a invoice', async () => {
    const mockInvoice: IInvoice = {
      id: 1,
      title: 'First Invoice',
      client_id: 1,
      user_id: 2,
      status: 'APPROVED',
      total_amount: 5000,
    };

    InvoiceRepository.update = jest.fn(() => {
      throw new Error('failed to update the invoice');
    });

    try {
      await InvoiceService.update(mockInvoice);
    } catch (err: any) {
      expect(err.message).toEqual('failed to update the invoice');
    }
  });
});

describe('invoice service - remove success', () => {
  test('should remove a invoice', async () => {
    const mockInvoice: IInvoice = {
      id: 1,
      title: 'First Invoice',
      client_id: 1,
      user_id: 2,
      status: 'APPROVED',
      total_amount: 5000,
      created_at: new Date(),
      updated_at: new Date(),
    };

    InvoiceRepository.getByID = jest.fn(() => Promise.resolve(mockInvoice));
    InvoiceRepository.remove = jest.fn(() => Promise.resolve());

    await InvoiceService.remove(1);

    expect(InvoiceRepository.remove).toBeCalledTimes(1);
  });
});

describe('invoice service - remove failure', () => {
  test('should fail to remove a invoice', async () => {
    InvoiceRepository.remove = jest.fn(() => {
      throw new Error('failed to remove the invoice');
    });

    try {
      await InvoiceService.remove(1);
    } catch (err: any) {
      expect(err.message).toEqual('failed to remove the invoice');
    }
  });
});
