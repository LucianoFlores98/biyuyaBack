import { ICardRepository } from "../repository/ICardRepository";

export interface IGetOneCardAction {
  execute: (query: any) => Promise<any>;
}

export const GetOneCardAction = (
  CardRepository: ICardRepository
): IGetOneCardAction => {
  return {
    execute(query) {
      return new Promise(async (resolve, reject) => {
        try {
          const card = await CardRepository.getOne(query);
          resolve(card);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
