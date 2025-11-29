import { IAccountRepository } from "../repository/IAccountRepository";

export interface IGetAllAccountsAction {
  execute: (query: any) => Promise<any>;
}

export const GetAllAccountsAction = (
  AccountRepository: IAccountRepository
): IGetAllAccountsAction => {
  return {
    execute(query) {
      return new Promise(async (resolve, reject) => {
        try {
          const accounts = await AccountRepository.getAll(query);
          resolve(accounts);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
