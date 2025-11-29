import { DependencyManager } from "../../dependencyManager";
import { RevenueRepository } from "./infrastructure/repository/RevenueRepository";

export const RevenueModuleInitializer = (dependencyManager: DependencyManager) => {
  const revenueRepository = RevenueRepository();
  dependencyManager.register("revenueRepository", revenueRepository);
};
