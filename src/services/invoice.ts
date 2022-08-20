import { IInvoice, IInvoiceService } from '../domain/invoice';
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
    await InvoiceRepository.create(invoice);
  } catch (err) {
    throw err;
  }
}

async function update(invoice: IInvoice): Promise<void> {
  try {
    await InvoiceRepository.getByID(Number(invoice?.id));
    await InvoiceRepository.update(invoice);
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
