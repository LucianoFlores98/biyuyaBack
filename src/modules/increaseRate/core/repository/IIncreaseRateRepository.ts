import IIncreaseRate from "../entities/IIncreaseRate";

export interface IIncreaseRateRepository {
  save: (increaseRate: IIncreaseRate) => Promise<unknown>;
  edit: (increaseRate: Partial<IIncreaseRate>, id: string) => Promise<unknown>;
  remove: (id: string) => Promise<unknown>;
  getAll: (query: unknown) => Promise<unknown>;
  getOne: (query: unknown) => Promise<unknown>;
  getById: (id: string) => Promise<unknown>;
}

