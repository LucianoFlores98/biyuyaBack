import IAccount from "../entities/IAccount";

export interface IAccountRepository {
  save: (account: IAccount) => Promise<any>;
  edit: (account: IAccount, id: string) => Promise<any>;
  remove: (id: string) => Promise<any>;
  getAll: (query: any) => Promise<any>;
  getOne: (query: any) => Promise<any>;
  getById: (id: string) => Promise<any>;
}
