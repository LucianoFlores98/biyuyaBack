import { DependencyManager } from "../../../../dependencyManager";
import { getRevenueActions } from "../../core/actions/actionsProvider";
import { IRevenueRepository } from "../../core/repository/IRevenueRepository";
import { IIncreaseRateRepository } from "../../../increaseRate/core/repository/IIncreaseRateRepository";
import { ISalaryIncreaseService } from "../../core/services/ISalaryIncreaseService";
import { RevenueControllers } from "./RevenueControllers";
import { SalaryController } from "./SalaryController";

export const getRevenueControllers = (dependencyManager: DependencyManager) => {
  const RevenueRepository = getRevenueRepository(dependencyManager);
  const IncreaseRateRepository = getIncreaseRateRepository(dependencyManager);
  const SalaryIncreaseService = getSalaryIncreaseService(dependencyManager);

  const RevenueActions = getRevenueActions(
    RevenueRepository,
    IncreaseRateRepository,
    SalaryIncreaseService
  );

  return RevenueControllers(RevenueActions);
};

export const getSalaryControllers = (dependencyManager: DependencyManager) => {
  const RevenueRepository = getRevenueRepository(dependencyManager);
  const IncreaseRateRepository = getIncreaseRateRepository(dependencyManager);
  const SalaryIncreaseService = getSalaryIncreaseService(dependencyManager);

  const RevenueActions = getRevenueActions(
    RevenueRepository,
    IncreaseRateRepository,
    SalaryIncreaseService
  );

  return SalaryController(RevenueActions);
};

const getRevenueRepository = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("revenueRepository") as IRevenueRepository;
};

const getIncreaseRateRepository = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("increaseRateRepository") as IIncreaseRateRepository;
};

const getSalaryIncreaseService = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("salaryIncreaseService") as ISalaryIncreaseService;
};
