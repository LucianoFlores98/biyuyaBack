import IAccount from "../entities/IAccount";

export interface IAccountRepository {
  save: (account: IAccount) => Promise<unknown>;
  edit: (account: Partial<IAccount>, id: string) => Promise<IAccount>;
  remove: (id: string) => Promise<unknown>;
  getAll: (query: unknown) => Promise<unknown>;
  getOne: (query: unknown) => Promise<unknown>;
  getById: (id: string) => Promise<unknown>;
}
