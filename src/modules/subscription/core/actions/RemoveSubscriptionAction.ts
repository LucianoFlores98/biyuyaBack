import { ISubscriptionRepository } from "../repository/ISubscriptionRepository";
import { SubscriptionNotExistException } from "../exceptions/SubscriptionNotExistException";

export interface IRemoveSubscriptionAction {
  execute: (id: string) => Promise<any>;
}

export const RemoveSubscriptionAction = (
  SubscriptionRepository: ISubscriptionRepository
): IRemoveSubscriptionAction => {
  return {
    execute(id) {
      return new Promise(async (resolve, reject) => {
        try {
          const subscription = await SubscriptionRepository.getById(id);
          if (!subscription) throw new SubscriptionNotExistException();
          await SubscriptionRepository.remove(id);
          resolve(subscription);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
