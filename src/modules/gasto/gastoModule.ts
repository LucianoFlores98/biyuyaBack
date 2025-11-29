import { DependencyManager } from "../../dependencyManager";
import { GastoRepository } from "./infrastructure/repository/GastoRepository";

export const GastoModuleInitializer = (dependencyManager: DependencyManager) => {
  const gastoRepository = GastoRepository();
  dependencyManager.register("gastoRepository", gastoRepository);
};
