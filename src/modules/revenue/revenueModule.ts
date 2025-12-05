import { DependencyManager } from "../../dependencyManager";
import { RevenueRepository } from "./infrastructure/repository/RevenueRepository";
import { SalaryIncreaseService } from "./infrastructure/services/SalaryIncreaseService";

export const RevenueModuleInitializer = (dependencyManager: DependencyManager) => {
  const revenueRepository = RevenueRepository();
  const salaryIncreaseService = new SalaryIncreaseService();

  dependencyManager.register("revenueRepository", revenueRepository);
  dependencyManager.register("salaryIncreaseService", salaryIncreaseService);
};
