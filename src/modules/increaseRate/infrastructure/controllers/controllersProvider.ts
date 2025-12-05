import { DependencyManager } from "../../../../dependencyManager";
import { getIncreaseRateActions } from "../../core/actions/actionsProvider";
import { IIncreaseRateRepository } from "../../core/repository/IIncreaseRateRepository";
import { IncreaseRateControllers } from "./IncreaseRateControllers";
import { IPCController } from "./IPCController";

export const getIncreaseRateControllers = (dependencyManager: DependencyManager) => {
  const IncreaseRateRepository = getIncreaseRateRepository(dependencyManager);
  const IncreaseRateActions = getIncreaseRateActions(IncreaseRateRepository);
  return IncreaseRateControllers(IncreaseRateActions);
};

export const getIPCControllers = (dependencyManager: DependencyManager) => {
  const IncreaseRateRepository = getIncreaseRateRepository(dependencyManager);
  const IncreaseRateActions = getIncreaseRateActions(IncreaseRateRepository);
  return IPCController(IncreaseRateActions);
};

const getIncreaseRateRepository = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("increaseRateRepository") as IIncreaseRateRepository;
};
