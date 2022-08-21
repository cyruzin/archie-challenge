export enum EInvoiceStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  CANCELED = 'CANCELED',
}

export interface IInvoiceItem {
  id?: number;
  invoice_id?: number;
  title: string;
  description: string;
  quantity: number;
  rate: number;
  amount?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface IInvoice {
  id?: number;
  user_id: number;
  client_id: number;
  items: IInvoiceItem[];
  status?: EInvoiceStatus;
  total_amount?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface IInvoiceRepository {
  getAll: () => Promise<IInvoice[]>;
  getByID: (id: number) => Promise<IInvoice>;
  create: (invoice: IInvoice) => Promise<void>;
  update: (invoice: IInvoice) => Promise<void>;
  remove: (id: number) => Promise<void>;
}

export interface IInvoiceService {
  getAll: () => Promise<IInvoice[]>;
  getByID: (id: number) => Promise<IInvoice>;
  create: (invoice: IInvoice) => Promise<void>;
  update: (invoice: IInvoice) => Promise<void>;
  remove: (id: number) => Promise<void>;
}
