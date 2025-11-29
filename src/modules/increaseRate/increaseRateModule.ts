import { DependencyManager } from "../../dependencyManager";
import { IncreaseRateRepository } from "./infrastructure/repository/IncreaseRateRepository";

export const IncreaseRateModuleInitializer = (dependencyManager: DependencyManager) => {
  const increaseRateRepository = IncreaseRateRepository();
  dependencyManager.register("increaseRateRepository", increaseRateRepository);
};
