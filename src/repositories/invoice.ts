import { IInvoice, IInvoiceRepository } from '../domain/invoice';
import ResourceNotFoundError from '../errors/resource-not-found';
import { postgres } from '../config/database';
import InvoiceError from '../errors/invoice';

async function getAll(): Promise<IInvoice[]> {
  try {
    const result = await postgres.query(
      `SELECT 
        id, 
        user_id, 
        client_id, 
        status, 
        total_amount, 
        created_at, 
        updated_at 
       FROM invoices 
       ORDER BY id DESC 
       LIMIT 50`,
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
    await postgres.query('BEGIN');

    const queryInvoice = `INSERT INTO invoices (
        user_id,
        client_id,
        total_amount
     )
     VALUES($1, $2, $3) RETURNING id`;

    const invoiceValues = [invoice.user_id, invoice.client_id, invoice.total_amount];

    const result = await postgres.query(queryInvoice, invoiceValues);

    await postgres.query('COMMIT');

    const lastInvoiceID = result.rows[0].id;

    const queryInvoiceItems = `INSERT INTO invoice_items (
          invoice_id,
          title,
          description,
          quantity,
          rate,
          amount
       ) 
       VALUES($1, $2, $3, $4, $5, $6)`;

    await Promise.all(
      invoice.items.map(async (item) => {
        await postgres.query(queryInvoiceItems, [
          lastInvoiceID,
          item.title,
          item.description,
          item.quantity,
          item.rate,
          item.amount,
        ]);
      }),
    );

    await postgres.query('COMMIT');
  } catch (err) {
    await postgres.query('ROLLBACK');
    throw new InvoiceError('Failed to create invoice');
  }
}

async function update(invoice: IInvoice): Promise<void> {
  try {
    await postgres.query('BEGIN');

    const queryInvoice = `
    UPDATE invoices SET 
     user_id=$1, client_id=$2, status=$3, total_amount=$4, created_at=$5 
    WHERE id=$6`;

    const updated_at = new Date();

    const invoiceValues = [
      invoice.user_id,
      invoice.client_id,
      invoice.status,
      invoice.total_amount,
      updated_at,
      invoice.id,
    ];

    await postgres.query(queryInvoice, invoiceValues);

    await postgres.query('COMMIT');

    const queryInvoiceItems = `UPDATE invoice_items SET
          invoice_id=$1,
          title=$2,
          description=$3,
          quantity=$4,
          rate=$5,
          amount=$6,
          updated_at=$7
        WHERE id=$8
          `;

    await Promise.all(
      invoice.items.map(async (item) => {
        await postgres.query(queryInvoiceItems, [
          invoice.id,
          item.title,
          item.description,
          item.quantity,
          item.rate,
          item.amount,
          updated_at,
          item.id,
        ]);
      }),
    );

    await postgres.query('COMMIT');
  } catch (err) {
    await postgres.query('ROLLBACK');
    throw new InvoiceError('Failed to update invoice');
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
