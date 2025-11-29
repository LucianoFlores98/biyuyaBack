import { IPaymentMethodRepository } from "../repository/IPaymentMethodRepository";
import { PaymentMethodNotExistException } from "../exceptions/PaymentMethodNotExistException";

export interface IRemovePaymentMethodAction {
  execute: (id: string) => Promise<any>;
}

export const RemovePaymentMethodAction = (
  PaymentMethodRepository: IPaymentMethodRepository
): IRemovePaymentMethodAction => {
  return {
    execute(id) {
      return new Promise(async (resolve, reject) => {
        try {
          const paymentMethod = await PaymentMethodRepository.getById(id);
          if (!paymentMethod) throw new PaymentMethodNotExistException();
          await PaymentMethodRepository.remove(id);
          resolve(paymentMethod);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
