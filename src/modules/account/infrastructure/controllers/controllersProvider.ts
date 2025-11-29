import { DependencyManager } from "../../../../dependencyManager";
import { getAccountActions } from "../../core/actions/actionsProvider";
import { IAccountRepository } from "../../core/repository/IAccountRepository";
import { AccountControllers } from "./AccountControllers";

export const getAccountControllers = (dependencyManager: DependencyManager) => {
  const AccountRepository = getAccountRepository(dependencyManager);
  const AccountActions = getAccountActions(AccountRepository);
  return AccountControllers(AccountActions);
};

const getAccountRepository = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("accountRepository") as IAccountRepository;
};
