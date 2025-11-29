import ISubscription from "../entities/ISubscription";

export interface ISubscriptionRepository {
  save: (subscription: ISubscription) => Promise<any>;
  edit: (subscription: ISubscription, id: string) => Promise<any>;
  remove: (id: string) => Promise<any>;
  getAll: (query: any) => Promise<any>;
  getOne: (query: any) => Promise<any>;
  getById: (id: string) => Promise<any>;
}
