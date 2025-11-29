import IPaymentMethod from "../entities/IPaymentMethod";

export interface IPaymentMethodRepository {
  save: (paymentMethod: IPaymentMethod) => Promise<any>;
  edit: (paymentMethod: IPaymentMethod, id: string) => Promise<any>;
  remove: (id: string) => Promise<any>;
  getAll: (query: any) => Promise<any>;
  getOne: (query: any) => Promise<any>;
  getById: (id: string) => Promise<any>;
}
