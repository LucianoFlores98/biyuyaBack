import { DependencyManager } from "../../dependencyManager";
import { WalletRepository } from "./infrastructure/repository/WalletRepository";

export const WalletModuleInitializer = (dependencyManager: DependencyManager) => {
  const walletRepository = WalletRepository();
  dependencyManager.register("walletRepository", walletRepository);
};
