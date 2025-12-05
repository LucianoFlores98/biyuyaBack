import { DependencyManager } from "../../../../dependencyManager";
import { getRevenueActions } from "../../core/actions/actionsProvider";
import { IRevenueRepository } from "../../core/repository/IRevenueRepository";
import { RevenueControllers } from "./RevenueControllers";

export const getRevenueControllers = (dependencyManager: DependencyManager) => {
  const RevenueRepository = getRevenueRepository(dependencyManager);
  const RevenueActions = getRevenueActions(RevenueRepository);
  return RevenueControllers(RevenueActions);
};

const getRevenueRepository = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("revenueRepository") as IRevenueRepository;
};
