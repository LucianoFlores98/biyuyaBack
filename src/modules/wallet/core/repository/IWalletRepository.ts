import IWallet from "../entities/IWallet";

export interface IWalletRepository {
  save: (wallet: IWallet) => Promise<any>;
  edit: (wallet: IWallet, id: string) => Promise<any>;
  remove: (id: string) => Promise<any>;
  getAll: (query: any) => Promise<any>;
  getOne: (query: any) => Promise<any>;
  getById: (id: string) => Promise<any>;
}
