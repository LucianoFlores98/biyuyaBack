import { IPaymentMethodRepository } from "../repository/IPaymentMethodRepository";

export interface IGetAllPaymentMethodsAction {
  execute: (query: any) => Promise<any>;
}

export const GetAllPaymentMethodsAction = (
  PaymentMethodRepository: IPaymentMethodRepository
): IGetAllPaymentMethodsAction => {
  return {
    execute(query) {
      return new Promise(async (resolve, reject) => {
        try {
          const paymentMethods = await PaymentMethodRepository.getAll(query);
          resolve(paymentMethods);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
