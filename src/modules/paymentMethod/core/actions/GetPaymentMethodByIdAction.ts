import { IPaymentMethodRepository } from "../repository/IPaymentMethodRepository";

export interface IGetPaymentMethodByIdAction {
  execute: (id: string) => Promise<any>;
}

export const GetPaymentMethodByIdAction = (
  PaymentMethodRepository: IPaymentMethodRepository
): IGetPaymentMethodByIdAction => {
  return {
    execute(id) {
      return new Promise(async (resolve, reject) => {
        try {
          const paymentMethod = await PaymentMethodRepository.getById(id);
          resolve(paymentMethod);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
