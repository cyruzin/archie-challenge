import { IInvoice, IInvoiceRepository } from '../domain/invoice';
import ResourceNotFoundError from '../errors/resource-not-found';
import { postgres } from '../config/database';

async function getAll(): Promise<IInvoice[]> {
  try {
    const result = await postgres.query(
      `SELECT 
        id, 
        user_id, 
        client_id, 
        title, 
        status, 
        total_amount, 
        created_at, 
        updated_at 
       FROM invoices 
       ORDER BY id DESC 
       LIMIT 100`,
    );

    return result.rows;
  } catch (err) {
    throw err;
  }
}

async function getByID(id: number): Promise<IInvoice> {
  try {
    const result = await postgres.query(
      `SELECT 
        id, 
        user_id, 
        client_id, 
        title, 
        status, 
        total_amount, 
        created_at, 
        updated_at 
       FROM invoices 
       WHERE id = $1`,
      [id],
    );

    if (!result.rows[0])
      throw new ResourceNotFoundError('The ID you are looking for could not found');

    return result.rows[0] as IInvoice;
  } catch (err) {
    throw err;
  }
}

async function create(invoice: IInvoice): Promise<void> {
  try {
    await postgres.query(
      `INSERT INTO invoices (
        user_id,
        client_id,
        title,
        total_amount 
       ) 
       VALUES($1, $2, $3, $4)`,
      [invoice.user_id, invoice.client_id, invoice.title, invoice.total_amount],
    );
  } catch (err) {
    throw err;
  }
}

async function update(invoice: IInvoice): Promise<void> {
  try {
    const updated_at = new Date();

    await postgres.query(
      `UPDATE invoices SET 
        user_id = $1, 
        client_id = $2, 
        title = $3, 
        status = $4, 
        total_amount = $5, 
        updated_at = $6 
       WHERE id = $7`,
      [
        invoice.user_id,
        invoice.client_id,
        invoice.title,
        invoice.status,
        invoice.total_amount,
        updated_at,
        invoice.id,
      ],
    );
  } catch (err) {
    throw err;
  }
}

async function remove(id: number): Promise<void> {
  try {
    await postgres.query('DELETE FROM invoices WHERE id = $1', [id]);
  } catch (err) {
    throw err;
  }
}

export const InvoiceRepository: IInvoiceRepository = {
  getAll,
  getByID,
  create,
  update,
  remove,
};
