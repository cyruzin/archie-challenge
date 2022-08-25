import React from "react";
import { AxiosAdapter } from "../../util/axios";

export enum EInvoiceStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  CANCELED = "CANCELED",
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

export default function Invoices() {
  const [invoice, setInvoice] = React.useState<IInvoice[]>([]);
  const [newInvoice, setNewInvoice] = React.useState<IInvoice>();

  const getInvoices = React.useCallback(async () => {
    try {
      const response = await AxiosAdapter.fetch({
        method: "GET",
        url: "/invoice",
      });

      setInvoice(response);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const getFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setNewInvoice((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const sendInvoice = async () => {
    try {
      console.log(newInvoice);

      return;

      await AxiosAdapter.fetch({
        method: "POST",
        url: "/invoice",
        //    data: newInvoice,
      });
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    getInvoices();
  }, [getInvoices]);

  return (
    <div>
      <h1>Invoices</h1>
      {invoice?.map((el) => (
        <React.Fragment key={el.id}>
          <p>
            {el.id} -{" "}
            {el.total_amount.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}{" "}
            - {el.status} - {el.created_at} - {el.created_at}{" "}
            <button>Edit</button> <button>Remove</button>
          </p>
          <p>Items</p>
          <ul>
            <li>{el.items.map((item) => item.id)}</li>
            <li>{el.items.map((item) => item.title)}</li>
            <li>{el.items.map((item) => item.rate)}</li>
            <li>{el.items.map((item) => item.amount)}</li>
          </ul>
        </React.Fragment>
      ))}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "400px",
          marginTop: "10px",
        }}
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={getFormData}
        />{" "}
        <br />
        <input
          type="text"
          name="description"
          placeholder="Description"
          onChange={getFormData}
        />{" "}
        <br />
        <input
          type="text"
          name="quantity"
          placeholder="Quantity"
          onChange={getFormData}
        />{" "}
        <br />
        <input
          type="text"
          name="rate"
          placeholder="Rate"
          onChange={getFormData}
        />{" "}
        <br />
        <button onClick={sendInvoice}>Save</button>
      </div>
    </div>
  );
}
