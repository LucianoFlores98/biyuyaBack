import { IWalletRepository } from "../repository/IWalletRepository";
import { EditWalletAction, IEditWalletAction } from "./EditWalletAction";
import { GetAllWalletsAction, IGetAllWalletsAction } from "./GetAllWalletsAction";
import { IGetOneWalletAction, GetOneWalletAction } from "./GetOneWalletAction";
import { GetWalletByIdAction, IGetWalletByIdAction } from "./GetWalletByIdAction";
import { IRemoveWalletAction, RemoveWalletAction } from "./RemoveWalletAction";
import { ISaveWalletAction, SaveWalletAction } from "./SaveWalletAction";

export interface IWalletActions {
  save: ISaveWalletAction;
  edit: IEditWalletAction;
  remove: IRemoveWalletAction;
  getAll: IGetAllWalletsAction;
  getById: IGetWalletByIdAction;
  getOne: IGetOneWalletAction;
}

export const getWalletActions = (
  WalletRepository: IWalletRepository
) => {
  const WalletActions: IWalletActions = {
    save: SaveWalletAction(WalletRepository),
    edit: EditWalletAction(WalletRepository),
    remove: RemoveWalletAction(WalletRepository),
    getAll: GetAllWalletsAction(WalletRepository),
    getById: GetWalletByIdAction(WalletRepository),
    getOne: GetOneWalletAction(WalletRepository),
  };
  return WalletActions;
};
