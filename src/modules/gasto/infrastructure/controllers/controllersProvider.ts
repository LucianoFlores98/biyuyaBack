import { DependencyManager } from "../../../../dependencyManager";
import { getGastoActions } from "../../core/actions/actionsProvider";
import { IGastoRepository } from "../../core/repository/IGastoRepository";
import { GastoControllers } from "./GastoControllers";

export const getGastoControllers = (dependencyManager: DependencyManager) => {
  const GastoRepository = getGastoRepository(dependencyManager);
  const GastoActions = getGastoActions(GastoRepository);
  return GastoControllers(GastoActions);
};

const getGastoRepository = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("gastoRepository") as IGastoRepository;
};
