import { Router } from "express";
import { DependencyManager } from "../../../../dependencyManager";
import { IJwtValidator } from "../../../../middlewares/JwtValidator/core/IJwtValidator";
import { getWalletControllers } from "../controllers/controllersProvider";

const getWalletRoutes = (dependencyManager: DependencyManager) => {
  const jwtValidator = getJwtValidator(dependencyManager);
  const { save, edit, remove, getAll, getById } =
    getWalletControllers(dependencyManager);
  const walletRouter = Router();
  const path = "wallets";

  walletRouter.post(`/${path}`, [jwtValidator], save);
  walletRouter.get(`/${path}`, [jwtValidator], getAll);
  walletRouter.get(`/${path}/:id`, [jwtValidator], getById);
  walletRouter.patch(`/${path}/:id`, [jwtValidator], edit);
  walletRouter.delete(`/${path}/:id`, [jwtValidator], remove);

  return walletRouter;
};

const getJwtValidator = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("jwtValidator") as IJwtValidator;
};

export default getWalletRoutes;
