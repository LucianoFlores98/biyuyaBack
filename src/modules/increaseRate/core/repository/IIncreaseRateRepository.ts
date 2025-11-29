import IIncreaseRate from "../entities/IIncreaseRate";

export interface IIncreaseRateRepository {
  save: (increaseRate: IIncreaseRate) => Promise<any>;
  edit: (increaseRate: IIncreaseRate, id: string) => Promise<any>;
  remove: (id: string) => Promise<any>;
  getAll: (query: any) => Promise<any>;
  getOne: (query: any) => Promise<any>;
  getById: (id: string) => Promise<any>;
}
