import IPaymentMethod from "../entities/IPaymentMethod";

export interface IPaymentMethodRepository {
  save: (paymentMethod: IPaymentMethod) => Promise<unknown>;
  edit: (paymentMethod: Partial<IPaymentMethod>, id: string) => Promise<unknown>;
  remove: (id: string) => Promise<unknown>;
  getAll: (query: unknown) => Promise<unknown>;
  getOne: (query: unknown) => Promise<unknown>;
  getById: (id: string) => Promise<unknown>;
}
