import IUser from "../entities/IUser";

export interface IUserRepository {
  save: (user: IUser) => Promise<unknown>;
  edit: (user: Partial<IUser>, id: string) => Promise<IUser>;
  remove: (id: string) => Promise<unknown>;
  getAll: (query: unknown) => Promise<unknown>;
  getOne: (query: unknown) => Promise<IUser | null>;
  getById: (id: string) => Promise<IUser | null>;
}
