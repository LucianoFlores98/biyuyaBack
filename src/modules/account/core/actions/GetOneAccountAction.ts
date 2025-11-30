import { IAccountRepository } from "../repository/IAccountRepository";

export interface IGetOneAccountAction {
  execute: (query: unknown) => Promise<unknown>;
}

export const GetOneAccountAction = (
  AccountRepository: IAccountRepository
): IGetOneAccountAction => {
  return {
    execute(query) {
      return new Promise(async (resolve, reject) => {
        try {
          const account = await AccountRepository.getOne(query);
          resolve(account);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
