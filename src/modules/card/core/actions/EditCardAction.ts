import ICard from "../entities/ICard";
import { CardNotExistException } from "../exceptions/CardNotExistException";
import { InvalidFieldException } from "../exceptions/InvalidFieldException";
import { ICardRepository } from "../repository/ICardRepository";

export interface IEditCardAction {
  execute: (body: Partial<ICard>, id: string) => Promise<unknown>;
}

export const EditCardAction = (
  CardRepository: ICardRepository
): IEditCardAction => {
  const allowedFields = ['name', 'card_number', 'inst_recargo', 'is_payed', 'wallet_id'];

  return {
    execute(body, id) {
      return new Promise(async (resolve, reject) => {
        try {
          const card = await CardRepository.getById(id);
          if (!card) throw new CardNotExistException();

          const bodyKeys = Object.keys(body);
          const invalidFields = bodyKeys.filter(key => !allowedFields.includes(key));

          if (invalidFields.length > 0) {
            throw new InvalidFieldException(invalidFields);
          }

          if (bodyKeys.length === 0) {
            resolve(card);
            return;
          }

          await CardRepository.edit(body, id);
          const result = await CardRepository.getById(id);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
