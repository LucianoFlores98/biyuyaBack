import IWallet from "../entities/IWallet";

export interface IWalletRepository {
  save: (wallet: IWallet) => Promise<unknown>;
  edit: (wallet: Partial<IWallet>, id: string) => Promise<unknown>;
  remove: (id: string) => Promise<unknown>;
  getAll: (query: unknown) => Promise<unknown>;
  getOne: (query: unknown) => Promise<unknown>;
  getById: (id: string) => Promise<unknown>;
}
