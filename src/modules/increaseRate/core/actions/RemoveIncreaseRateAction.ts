import { IIncreaseRateRepository } from "../repository/IIncreaseRateRepository";
import { IncreaseRateNotExistException } from "../exceptions/IncreaseRateNotExistException";

export interface IRemoveIncreaseRateAction {
  execute: (id: string) => Promise<unknown>;
}

export const RemoveIncreaseRateAction = (
  IncreaseRateRepository: IIncreaseRateRepository
): IRemoveIncreaseRateAction => {
  return {
    execute(id) {
      return new Promise(async (resolve, reject) => {
        try {
          const increaseRate = await IncreaseRateRepository.getById(id);
          if (!increaseRate) throw new IncreaseRateNotExistException();
          await IncreaseRateRepository.remove(id);
          resolve(increaseRate);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
