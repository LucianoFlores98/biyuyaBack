import ICard from "../entities/ICard";
import { ICardRepository } from "../repository/ICardRepository";

export interface ISaveCardAction {
  execute: (body: ICard) => Promise<unknown>;
}

export const SaveCardAction = (
  CardRepository: ICardRepository
): ISaveCardAction => {
  return {
    execute: (body) => {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await CardRepository.save(body);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
