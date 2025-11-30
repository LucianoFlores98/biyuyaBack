import { IGastoRepository } from "../repository/IGastoRepository";
import { GastoNotExistException } from "../exceptions/GastoNotExistException";

export interface IRemoveGastoAction {
  execute: (id: string) => Promise<unknown>;
}

export const RemoveGastoAction = (
  GastoRepository: IGastoRepository
): IRemoveGastoAction => {
  return {
    execute(id) {
      return new Promise(async (resolve, reject) => {
        try {
          const gasto = await GastoRepository.getById(id);
          if (!gasto) throw new GastoNotExistException();
          await GastoRepository.remove(id);
          resolve(gasto);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
