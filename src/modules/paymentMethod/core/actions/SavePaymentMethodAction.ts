import IPaymentMethod from "../entities/IPaymentMethod";
import { IPaymentMethodRepository } from "../repository/IPaymentMethodRepository";

export interface ISavePaymentMethodAction {
  execute: (body: IPaymentMethod) => Promise<unknown>;
}

export const SavePaymentMethodAction = (
  PaymentMethodRepository: IPaymentMethodRepository
): ISavePaymentMethodAction => {
  return {
    execute: (body) => {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await PaymentMethodRepository.save(body);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
