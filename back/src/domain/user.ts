export interface IUser {
  id?: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IUserRepository {
  getAll: () => Promise<IUser[]>;
  getByID: (id: number) => Promise<IUser>;
  create: (user: IUser) => Promise<void>;
  update: (user: IUser) => Promise<void>;
  remove: (id: number) => Promise<void>;
}

export interface IUserService {
  getAll: () => Promise<IUser[]>;
  getByID: (id: number) => Promise<IUser>;
  create: (user: IUser) => Promise<void>;
  update: (user: IUser) => Promise<void>;
  remove: (id: number) => Promise<void>;
}
