import IIncreaseRate from "../entities/IIncreaseRate";
import { IncreaseRateNotExistException } from "../exceptions/IncreaseRateNotExistException";
import { IIncreaseRateRepository } from "../repository/IIncreaseRateRepository";

export interface IEditIncreaseRateAction {
  execute: (body: IIncreaseRate, id: string) => Promise<unknown>;
}

export const EditIncreaseRateAction = (
  IncreaseRateRepository: IIncreaseRateRepository
): IEditIncreaseRateAction => {
  return {
    execute(body, id) {
      return new Promise(async (resolve, reject) => {
        try {
          const increaseRate = await IncreaseRateRepository.getById(id);
          if (!increaseRate) throw new IncreaseRateNotExistException();
          await IncreaseRateRepository.edit(body, id);
          const result = await IncreaseRateRepository.getById(id);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
