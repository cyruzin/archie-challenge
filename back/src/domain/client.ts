export interface IClient {
  id?: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IClientRepository {
  getAll: () => Promise<IClient[]>;
  getByID: (id: number) => Promise<IClient>;
  create: (client: IClient) => Promise<void>;
  update: (client: IClient) => Promise<void>;
  remove: (id: number) => Promise<void>;
}

export interface IClientService {
  getAll: () => Promise<IClient[]>;
  getByID: (id: number) => Promise<IClient>;
  create: (client: IClient) => Promise<void>;
  update: (client: IClient) => Promise<void>;
  remove: (id: number) => Promise<void>;
}
