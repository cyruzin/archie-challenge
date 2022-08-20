import { IInvoice, IInvoiceItem, IInvoiceService } from '../domain/invoice';
import { InvoiceRepository } from '../repositories/invoice';

async function getAll(): Promise<IInvoice[]> {
  try {
    return await InvoiceRepository.getAll();
  } catch (err) {
    throw err;
  }
}

async function getByID(id: number): Promise<IInvoice> {
  try {
    return await InvoiceRepository.getByID(id);
  } catch (err) {
    throw err;
  }
}

async function create(invoice: IInvoice): Promise<void> {
  try {
    const calcs: IInvoiceItem[] = invoice.items.map((current: IInvoiceItem) => ({
      ...current,
      amount: current.rate * current.quantity,
    }));

    const createInvoice: IInvoice = {
      ...invoice,
      items: calcs,
      total_amount: calcs.reduce((previous, current) => previous + Number(current.amount), 0),
    };

    await InvoiceRepository.create(createInvoice);
  } catch (err) {
    throw err;
  }
}

async function update(invoice: IInvoice): Promise<void> {
  try {
    await InvoiceRepository.getByID(Number(invoice.id));

    const calcs: IInvoiceItem[] = invoice.items.map((current: IInvoiceItem) => ({
      ...current,
      amount: current.rate * current.quantity,
    }));

    const updateInvoice: IInvoice = {
      ...invoice,
      items: calcs,
      total_amount: calcs.reduce((previous, current) => previous + Number(current.amount), 0),
    };

    await InvoiceRepository.update(updateInvoice);
  } catch (err) {
    throw err;
  }
}

async function remove(id: number): Promise<void> {
  try {
    await InvoiceRepository.getByID(id);
    await InvoiceRepository.remove(id);
  } catch (err) {
    throw err;
  }
}

export const InvoiceService: IInvoiceService = {
  getAll,
  getByID,
  create,
  update,
  remove,
};
