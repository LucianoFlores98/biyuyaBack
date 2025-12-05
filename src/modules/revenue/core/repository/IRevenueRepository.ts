import IRevenue from "../entities/IRevenue";

export interface IRevenueRepository {
  save: (revenue: IRevenue) => Promise<unknown>;
  edit: (revenue: IRevenue, id: string) => Promise<unknown>;
  remove: (id: string) => Promise<unknown>;
  getAll: (query: unknown) => Promise<unknown>;
  getOne: (query: unknown) => Promise<unknown>;
  getById: (id: string) => Promise<unknown>;
}

