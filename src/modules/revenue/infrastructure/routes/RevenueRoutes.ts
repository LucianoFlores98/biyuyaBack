import { Router } from "express";
import { DependencyManager } from "../../../../dependencyManager";
import { IJwtValidator } from "../../../../middlewares/JwtValidator/core/IJwtValidator";
import { getRevenueControllers } from "../controllers/controllersProvider";

const getRevenueRoutes = (dependencyManager: DependencyManager) => {
  const jwtValidator = getJwtValidator(dependencyManager);
  const { save, edit, remove, getAll, getById } =
    getRevenueControllers(dependencyManager);
  const revenueRouter = Router();
  const path = "revenues";

  revenueRouter.post(`/${path}`, [jwtValidator], save);
  revenueRouter.get(`/${path}`, [jwtValidator], getAll);
  revenueRouter.get(`/${path}/:id`, [jwtValidator], getById);
  revenueRouter.patch(`/${path}/:id`, [jwtValidator], edit);
  revenueRouter.delete(`/${path}/:id`, [jwtValidator], remove);

  return revenueRouter;
};

const getJwtValidator = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("jwtValidator") as IJwtValidator;
};

export default getRevenueRoutes;

