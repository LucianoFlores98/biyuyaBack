import { ISubscriptionRepository } from "../repository/ISubscriptionRepository";

export interface IGetOneSubscriptionAction {
  execute: (query: any) => Promise<any>;
}

export const GetOneSubscriptionAction = (
  SubscriptionRepository: ISubscriptionRepository
): IGetOneSubscriptionAction => {
  return {
    execute(query) {
      return new Promise(async (resolve, reject) => {
        try {
          const subscription = await SubscriptionRepository.getOne(query);
          resolve(subscription);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
