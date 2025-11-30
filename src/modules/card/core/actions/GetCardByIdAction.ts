import { ICardRepository } from "../repository/ICardRepository";

export interface IGetCardByIdAction {
  execute: (id: string) => Promise<unknown>;
}

export const GetCardByIdAction = (
  CardRepository: ICardRepository
): IGetCardByIdAction => {
  return {
    execute(id) {
      return new Promise(async (resolve, reject) => {
        try {
          const card = await CardRepository.getById(id);
          resolve(card);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
