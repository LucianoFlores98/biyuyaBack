import IAccount from "../entities/IAccount";

export interface IAccountRepository {
  save: (account: IAccount) => Promise<IAccount>;
  edit: (account: IAccount, id: string) => Promise<IAccount>;
  remove: (id: string) => Promise<IAccount>;
  getAll: (query: unknown) => Promise<IAccount[]>;
  getOne: (query: unknown) => Promise<IAccount | null>;
  getById: (id: string) => Promise<IAccount | null>;
}
