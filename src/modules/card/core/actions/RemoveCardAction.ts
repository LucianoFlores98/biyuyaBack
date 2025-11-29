import { ICardRepository } from "../repository/ICardRepository";
import { CardNotExistException } from "../exceptions/CardNotExistException";

export interface IRemoveCardAction {
  execute: (id: string) => Promise<any>;
}

export const RemoveCardAction = (
  CardRepository: ICardRepository
): IRemoveCardAction => {
  return {
    execute(id) {
      return new Promise(async (resolve, reject) => {
        try {
          const card = await CardRepository.getById(id);
          if (!card) throw new CardNotExistException();
          await CardRepository.remove(id);
          resolve(card);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
