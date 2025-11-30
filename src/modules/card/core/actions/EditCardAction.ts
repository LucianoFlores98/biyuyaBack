import ICard from "../entities/ICard";
import { CardNotExistException } from "../exceptions/CardNotExistException";
import { ICardRepository } from "../repository/ICardRepository";

export interface IEditCardAction {
  execute: (body: ICard, id: string) => Promise<unknown>;
}

export const EditCardAction = (
  CardRepository: ICardRepository
): IEditCardAction => {
  return {
    execute(body, id) {
      return new Promise(async (resolve, reject) => {
        try {
          const card = await CardRepository.getById(id);
          if (!card) throw new CardNotExistException();
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
