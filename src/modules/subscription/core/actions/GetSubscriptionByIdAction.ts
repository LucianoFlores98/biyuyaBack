import { ISubscriptionRepository } from "../repository/ISubscriptionRepository";

export interface IGetSubscriptionByIdAction {
  execute: (id: string) => Promise<unknown>;
}

export const GetSubscriptionByIdAction = (
  SubscriptionRepository: ISubscriptionRepository
): IGetSubscriptionByIdAction => {
  return {
    execute(id) {
      return new Promise(async (resolve, reject) => {
        try {
          const subscription = await SubscriptionRepository.getById(id);
          resolve(subscription);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
