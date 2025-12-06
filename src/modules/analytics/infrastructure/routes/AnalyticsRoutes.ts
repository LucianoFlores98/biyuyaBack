import { Router } from "express";
import { DependencyManager } from "../../../../dependencyManager";
import { IJwtValidator } from "../../../../middlewares/JwtValidator/core/IJwtValidator";
import { AnalyticsControllers } from "../controllers/AnalyticsControllers";
import { GetSalaryProjectionAction } from "../../core/actions/GetSalaryProjectionAction";
import { ProjectionService } from "../../core/services/ProjectionService";

const getJwtValidator = (dependencyManager: DependencyManager): IJwtValidator => {
  return dependencyManager.resolve("jwtValidator") as IJwtValidator;
};

const getAnalyticsRoutes = (dependencyManager: DependencyManager) => {
  const jwtValidator = getJwtValidator(dependencyManager);

  // Obtener repositorios de otros módulos desde el DependencyManager
  const revenueRepository = dependencyManager.resolve("revenueRepository");
  const increaseRateRepository = dependencyManager.resolve("increaseRateRepository");

  // Crear servicio de proyección
  const projectionService = new ProjectionService(
    revenueRepository as any,
    increaseRateRepository as any
  );

  // Crear acciones
  const getSalaryProjection = GetSalaryProjectionAction(projectionService);

  // Crear controladores
  const { getSalaryProjection: getSalaryProjectionController } = AnalyticsControllers({
    getSalaryProjection,
  });

  const analyticsRouter = Router();
  const path = "analytics";

  // Rutas
  analyticsRouter.get(
    `/${path}/salary-projection/:revenueId`,
    [jwtValidator],
    getSalaryProjectionController
  );

  return analyticsRouter;
};

export default getAnalyticsRoutes;
