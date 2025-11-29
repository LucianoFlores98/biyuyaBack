import { Router } from "express";
import { DependencyManager } from "../../../../dependencyManager";
import { IJwtValidator } from "../../../../middlewares/JwtValidator/core/IJwtValidator";
import { getPaymentMethodControllers } from "../controllers/controllersProvider";

const getPaymentMethodRoutes = (dependencyManager: DependencyManager) => {
  const jwtValidator = getJwtValidator(dependencyManager);
  const { save, edit, remove, getAll, getById } =
    getPaymentMethodControllers(dependencyManager);
  const paymentMethodRouter = Router();
  const path = "payment-methods";

  paymentMethodRouter.post(`/${path}`, [jwtValidator], save);
  paymentMethodRouter.get(`/${path}`, [jwtValidator], getAll);
  paymentMethodRouter.get(`/${path}/:id`, [jwtValidator], getById);
  paymentMethodRouter.patch(`/${path}/:id`, [jwtValidator], edit);
  paymentMethodRouter.delete(`/${path}/:id`, [jwtValidator], remove);

  return paymentMethodRouter;
};

const getJwtValidator = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("jwtValidator") as IJwtValidator;
};

export default getPaymentMethodRoutes;
