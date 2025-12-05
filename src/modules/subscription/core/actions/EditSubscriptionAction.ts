import ISubscription from "../entities/ISubscription";
import { SubscriptionNotExistException } from "../exceptions/SubscriptionNotExistException";
import { InvalidFieldException } from "../exceptions/InvalidFieldException";
import { ISubscriptionRepository } from "../repository/ISubscriptionRepository";

export interface IEditSubscriptionAction {
  execute: (body: Partial<ISubscription>, id: string) => Promise<unknown>;
}

export const EditSubscriptionAction = (
  SubscriptionRepository: ISubscriptionRepository
): IEditSubscriptionAction => {
  const allowedFields = ['name', 'type', 'monthly_cost', 'date', 'increase_rate_id', 'user_id'];

  return {
    execute(body, id) {
      return new Promise(async (resolve, reject) => {
        try {
          const subscription = await SubscriptionRepository.getById(id);
          if (!subscription) throw new SubscriptionNotExistException();

          const bodyKeys = Object.keys(body);
          const invalidFields = bodyKeys.filter(key => !allowedFields.includes(key));

          if (invalidFields.length > 0) {
            throw new InvalidFieldException(invalidFields);
          }

          if (bodyKeys.length === 0) {
            resolve(subscription);
            return;
          }

          await SubscriptionRepository.edit(body, id);
          const result = await SubscriptionRepository.getById(id);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
