import IIncreaseRate from "../entities/IIncreaseRate";
import { IncreaseRateNotExistException } from "../exceptions/IncreaseRateNotExistException";
import { InvalidFieldException } from "../exceptions/InvalidFieldException";
import { IIncreaseRateRepository } from "../repository/IIncreaseRateRepository";

export interface IEditIncreaseRateAction {
  execute: (body: Partial<IIncreaseRate>, id: string) => Promise<unknown>;
}

export const EditIncreaseRateAction = (
  IncreaseRateRepository: IIncreaseRateRepository
): IEditIncreaseRateAction => {
  // Campos permitidos para actualización (excluyendo id, createdAt, updatedAt)
  const allowedFields = ['name', 'type', 'rate', 'period'];

  return {
    execute(body, id) {
      return new Promise(async (resolve, reject) => {
        try {
          // Validar que el increaseRate existe
          const increaseRate = await IncreaseRateRepository.getById(id);
          if (!increaseRate) throw new IncreaseRateNotExistException();

          // Validar campos
          const bodyKeys = Object.keys(body);
          const invalidFields = bodyKeys.filter(key => !allowedFields.includes(key));

          if (invalidFields.length > 0) {
            throw new InvalidFieldException(invalidFields);
          }

          // Actualizar solo si hay campos válidos
          if (bodyKeys.length === 0) {
            resolve(increaseRate);
            return;
          }

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
