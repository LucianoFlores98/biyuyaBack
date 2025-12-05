import IPaymentMethod from "../entities/IPaymentMethod";
import { PaymentMethodNotExistException } from "../exceptions/PaymentMethodNotExistException";
import { InvalidFieldException } from "../exceptions/InvalidFieldException";
import { IPaymentMethodRepository } from "../repository/IPaymentMethodRepository";

export interface IEditPaymentMethodAction {
  execute: (body: Partial<IPaymentMethod>, id: string) => Promise<unknown>;
}

export const EditPaymentMethodAction = (
  PaymentMethodRepository: IPaymentMethodRepository
): IEditPaymentMethodAction => {
  const allowedFields = ['name', 'type', 'installments', 'installment_amount', 'card_id', 'gasto_id', 'account_id'];

  return {
    execute(body, id) {
      return new Promise(async (resolve, reject) => {
        try {
          const paymentMethod = await PaymentMethodRepository.getById(id);
          if (!paymentMethod) throw new PaymentMethodNotExistException();

          const bodyKeys = Object.keys(body);
          const invalidFields = bodyKeys.filter(key => !allowedFields.includes(key));

          if (invalidFields.length > 0) {
            throw new InvalidFieldException(invalidFields);
          }

          if (bodyKeys.length === 0) {
            resolve(paymentMethod);
            return;
          }

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
