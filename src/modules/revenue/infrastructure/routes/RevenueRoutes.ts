import { Router } from "express";
import { DependencyManager } from "../../../../dependencyManager";
import { IJwtValidator } from "../../../../middlewares/JwtValidator/core/IJwtValidator";
import { getRevenueControllers, getSalaryControllers } from "../controllers/controllersProvider";

const getRevenueRoutes = (dependencyManager: DependencyManager) => {
  const jwtValidator = getJwtValidator(dependencyManager);
  const { save, edit, remove, getAll, getById } =
    getRevenueControllers(dependencyManager);
  const { calculateIncrease, applyIncrease, getPendingIncreases } =
    getSalaryControllers(dependencyManager);
  const revenueRouter = Router();
  const path = "revenues";

  // Standard CRUD routes
  revenueRouter.post(`/${path}`, [jwtValidator], save);
  revenueRouter.get(`/${path}`, [jwtValidator], getAll);
  revenueRouter.get(`/${path}/:id`, [jwtValidator], getById);
  revenueRouter.patch(`/${path}/:id`, [jwtValidator], edit);
  revenueRouter.delete(`/${path}/:id`, [jwtValidator], remove);

  // Salary increase routes
  revenueRouter.post(`/${path}/salary/:id/calculate-increase`, [jwtValidator], calculateIncrease);
  revenueRouter.post(`/${path}/salary/:id/apply-increase`, [jwtValidator], applyIncrease);
  revenueRouter.get(`/${path}/salary/pending-increases`, [jwtValidator], getPendingIncreases);

  return revenueRouter;
};

const getJwtValidator = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("jwtValidator") as IJwtValidator;
};

export default getRevenueRoutes;
