import IUser from "../entities/IUser";

export interface IUserRepository {
  save: (user: IUser) => Promise<IUser>;
  edit: (user: IUser, id: string) => Promise<IUser>;
  remove: (id: string) => Promise<IUser>;
  getAll: (query: unknown) => Promise<IUser[]>;
  getOne: (query: unknown) => Promise<IUser | null>;
  getById: (id: string) => Promise<IUser | null>;
}
