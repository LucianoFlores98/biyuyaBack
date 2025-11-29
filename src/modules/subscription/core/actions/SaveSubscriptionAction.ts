import ISubscription from "../entities/ISubscription";
import { ISubscriptionRepository } from "../repository/ISubscriptionRepository";

export interface ISaveSubscriptionAction {
  execute: (body: ISubscription) => Promise<any>;
}

export const SaveSubscriptionAction = (
  SubscriptionRepository: ISubscriptionRepository
): ISaveSubscriptionAction => {
  return {
    execute: (body) => {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await SubscriptionRepository.save(body);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
