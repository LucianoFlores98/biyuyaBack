import ISubscription from "../entities/ISubscription";

export interface ISubscriptionRepository {
  save: (subscription: ISubscription) => Promise<unknown>;
  edit: (subscription: ISubscription, id: string) => Promise<unknown>;
  remove: (id: string) => Promise<unknown>;
  getAll: (query: unknown) => Promise<unknown>;
  getOne: (query: unknown) => Promise<unknown>;
  getById: (id: string) => Promise<unknown>;
}
