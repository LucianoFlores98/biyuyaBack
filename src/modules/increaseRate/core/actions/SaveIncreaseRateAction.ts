import IIncreaseRate from "../entities/IIncreaseRate";
import { IIncreaseRateRepository } from "../repository/IIncreaseRateRepository";

export interface ISaveIncreaseRateAction {
  execute: (body: IIncreaseRate) => Promise<unknown>;
}

export const SaveIncreaseRateAction = (
  IncreaseRateRepository: IIncreaseRateRepository
): ISaveIncreaseRateAction => {
  return {
    execute: (body) => {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await IncreaseRateRepository.save(body);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
