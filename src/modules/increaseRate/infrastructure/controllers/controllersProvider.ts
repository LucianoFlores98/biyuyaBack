import { DependencyManager } from "../../../../dependencyManager";
import { getIncreaseRateActions } from "../../core/actions/actionsProvider";
import { IIncreaseRateRepository } from "../../core/repository/IIncreaseRateRepository";
import { IncreaseRateControllers } from "./IncreaseRateControllers";

export const getIncreaseRateControllers = (dependencyManager: DependencyManager) => {
  const IncreaseRateRepository = getIncreaseRateRepository(dependencyManager);
  const IncreaseRateActions = getIncreaseRateActions(IncreaseRateRepository);
  return IncreaseRateControllers(IncreaseRateActions);
};

const getIncreaseRateRepository = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("increaseRateRepository") as IIncreaseRateRepository;
};
