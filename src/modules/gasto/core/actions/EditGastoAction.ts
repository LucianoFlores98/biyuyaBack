import IGasto from "../entities/IGasto";
import { GastoNotExistException } from "../exceptions/GastoNotExistException";
import { IGastoRepository } from "../repository/IGastoRepository";

export interface IEditGastoAction {
  execute: (body: IGasto, id: string) => Promise<unknown>;
}

export const EditGastoAction = (
  GastoRepository: IGastoRepository
): IEditGastoAction => {
  return {
    execute(body, id) {
      return new Promise(async (resolve, reject) => {
        try {
          const gasto = await GastoRepository.getById(id);
          if (!gasto) throw new GastoNotExistException();
          await GastoRepository.edit(body, id);
          const result = await GastoRepository.getById(id);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
