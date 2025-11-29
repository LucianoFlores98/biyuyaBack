import { DependencyManager } from "../../dependencyManager";
import { AccountRepository } from "./infrastructure/repository/AccountRepository";

export const AccountModuleInitializer = (dependencyManager: DependencyManager) => {
  const accountRepository = AccountRepository();
  dependencyManager.register("accountRepository", accountRepository);
};
