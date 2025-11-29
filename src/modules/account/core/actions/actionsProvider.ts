import { IAccountRepository } from "../repository/IAccountRepository";
import { EditAccountAction, IEditAccountAction } from "./EditAccountAction";
import { GetAllAccountsAction, IGetAllAccountsAction } from "./GetAllAccountsAction";
import { IGetOneAccountAction, GetOneAccountAction } from "./GetOneAccountAction";
import { GetAccountByIdAction, IGetAccountByIdAction } from "./GetAccountByIdAction";
import { IRemoveAccountAction, RemoveAccountAction } from "./RemoveAccountAction";
import { ISaveAccountAction, SaveAccountAction } from "./SaveAccountAction";

export interface IAccountActions {
  save: ISaveAccountAction;
  edit: IEditAccountAction;
  remove: IRemoveAccountAction;
  getAll: IGetAllAccountsAction;
  getById: IGetAccountByIdAction;
  getOne: IGetOneAccountAction;
}

export const getAccountActions = (
  AccountRepository: IAccountRepository
) => {
  const AccountActions: IAccountActions = {
    save: SaveAccountAction(AccountRepository),
    edit: EditAccountAction(AccountRepository),
    remove: RemoveAccountAction(AccountRepository),
    getAll: GetAllAccountsAction(AccountRepository),
    getById: GetAccountByIdAction(AccountRepository),
    getOne: GetOneAccountAction(AccountRepository),
  };
  return AccountActions;
};
