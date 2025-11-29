import { ISubscriptionRepository } from "../repository/ISubscriptionRepository";

export interface IGetAllSubscriptionsAction {
  execute: (query: any) => Promise<any>;
}

export const GetAllSubscriptionsAction = (
  SubscriptionRepository: ISubscriptionRepository
): IGetAllSubscriptionsAction => {
  return {
    execute(query) {
      return new Promise(async (resolve, reject) => {
        try {
          const subscriptions = await SubscriptionRepository.getAll(query);
          resolve(subscriptions);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
