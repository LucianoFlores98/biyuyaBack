import IPaymentMethod from "../entities/IPaymentMethod";
import { PaymentMethodNotExistException } from "../exceptions/PaymentMethodNotExistException";
import { IPaymentMethodRepository } from "../repository/IPaymentMethodRepository";

export interface IEditPaymentMethodAction {
  execute: (body: IPaymentMethod, id: string) => Promise<unknown>;
}

export const EditPaymentMethodAction = (
  PaymentMethodRepository: IPaymentMethodRepository
): IEditPaymentMethodAction => {
  return {
    execute(body, id) {
      return new Promise(async (resolve, reject) => {
        try {
          const paymentMethod = await PaymentMethodRepository.getById(id);
          if (!paymentMethod) throw new PaymentMethodNotExistException();
          await PaymentMethodRepository.edit(body, id);
          const result = await PaymentMethodRepository.getById(id);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
