import { ICardRepository } from "../repository/ICardRepository";

export interface IGetAllCardsAction {
  execute: (query: any) => Promise<any>;
}

export const GetAllCardsAction = (
  CardRepository: ICardRepository
): IGetAllCardsAction => {
  return {
    execute(query) {
      return new Promise(async (resolve, reject) => {
        try {
          const cards = await CardRepository.getAll(query);
          resolve(cards);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
