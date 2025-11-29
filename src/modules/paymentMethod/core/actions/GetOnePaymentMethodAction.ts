import { IPaymentMethodRepository } from "../repository/IPaymentMethodRepository";

export interface IGetOnePaymentMethodAction {
  execute: (query: any) => Promise<any>;
}

export const GetOnePaymentMethodAction = (
  PaymentMethodRepository: IPaymentMethodRepository
): IGetOnePaymentMethodAction => {
  return {
    execute(query) {
      return new Promise(async (resolve, reject) => {
        try {
          const paymentMethod = await PaymentMethodRepository.getOne(query);
          resolve(paymentMethod);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
