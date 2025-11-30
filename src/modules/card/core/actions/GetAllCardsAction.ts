import { ICardRepository } from "../repository/ICardRepository";
import ICard from "../entities/ICard";

export interface IGetAllCardsAction {
  execute: (query: unknown) => Promise<unknown>;
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
