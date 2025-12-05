import IGasto from "../entities/IGasto";
import { GastoNotExistException } from "../exceptions/GastoNotExistException";
import { InvalidFieldException } from "../exceptions/InvalidFieldException";
import { IGastoRepository } from "../repository/IGastoRepository";

export interface IEditGastoAction {
  execute: (body: Partial<IGasto>, id: string) => Promise<unknown>;
}

export const EditGastoAction = (
  GastoRepository: IGastoRepository
): IEditGastoAction => {
  const allowedFields = ['name', 'type', 'total_amount', 'payment_end_date', 'payment_method_id', 'user_id'];

  return {
    execute(body, id) {
      return new Promise(async (resolve, reject) => {
        try {
          const gasto = await GastoRepository.getById(id);
          if (!gasto) throw new GastoNotExistException();

          const bodyKeys = Object.keys(body);
          const invalidFields = bodyKeys.filter(key => !allowedFields.includes(key));

          if (invalidFields.length > 0) {
            throw new InvalidFieldException(invalidFields);
          }

          if (bodyKeys.length === 0) {
            resolve(gasto);
            return;
          }

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
