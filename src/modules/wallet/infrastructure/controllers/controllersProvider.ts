import { DependencyManager } from "../../../../dependencyManager";
import { getWalletActions } from "../../core/actions/actionsProvider";
import { IWalletRepository } from "../../core/repository/IWalletRepository";
import { WalletControllers } from "./WalletControllers";

export const getWalletControllers = (dependencyManager: DependencyManager) => {
  const WalletRepository = getWalletRepository(dependencyManager);
  const WalletActions = getWalletActions(WalletRepository);
  return WalletControllers(WalletActions);
};

const getWalletRepository = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("walletRepository") as IWalletRepository;
};
