import { Router } from "express";
import { DependencyManager } from "../../../../dependencyManager";
import { IJwtValidator } from "../../../../middlewares/JwtValidator/core/IJwtValidator";
import { getSubscriptionControllers } from "../controllers/controllersProvider";

const getSubscriptionRoutes = (dependencyManager: DependencyManager) => {
  const jwtValidator = getJwtValidator(dependencyManager);
  const { save, edit, remove, getAll, getById } =
    getSubscriptionControllers(dependencyManager);
  const subscriptionRouter = Router();
  const path = "subscriptions";

  subscriptionRouter.post(`/${path}`, [jwtValidator], save);
  subscriptionRouter.get(`/${path}`, [jwtValidator], getAll);
  subscriptionRouter.get(`/${path}/:id`, [jwtValidator], getById);
  subscriptionRouter.patch(`/${path}/:id`, [jwtValidator], edit);
  subscriptionRouter.delete(`/${path}/:id`, [jwtValidator], remove);

  return subscriptionRouter;
};

const getJwtValidator = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("jwtValidator") as IJwtValidator;
};

export default getSubscriptionRoutes;
