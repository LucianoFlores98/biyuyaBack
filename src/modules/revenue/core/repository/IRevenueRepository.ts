import IRevenue from "../entities/IRevenue";

export interface IRevenueRepository {
  save: (revenue: IRevenue) => Promise<any>;
  edit: (revenue: IRevenue, id: string) => Promise<any>;
  remove: (id: string) => Promise<any>;
  getAll: (query: any) => Promise<any>;
  getOne: (query: any) => Promise<any>;
  getById: (id: string) => Promise<any>;
}
