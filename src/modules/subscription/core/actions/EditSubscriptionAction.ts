import ISubscription from "../entities/ISubscription";
import { SubscriptionNotExistException } from "../exceptions/SubscriptionNotExistException";
import { ISubscriptionRepository } from "../repository/ISubscriptionRepository";

export interface IEditSubscriptionAction {
  execute: (body: ISubscription, id: string) => Promise<unknown>;
}

export const EditSubscriptionAction = (
  SubscriptionRepository: ISubscriptionRepository
): IEditSubscriptionAction => {
  return {
    execute(body, id) {
      return new Promise(async (resolve, reject) => {
        try {
          const subscription = await SubscriptionRepository.getById(id);
          if (!subscription) throw new SubscriptionNotExistException();
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
