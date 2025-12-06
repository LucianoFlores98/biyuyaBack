import { ProjectionService } from "../services/ProjectionService";
import { IPCCalculationMode } from "../entities/ISalaryProjection";

export interface IGetSalaryProjectionAction {
  execute: (
    revenueId: string,
    months?: number,
    mode?: IPCCalculationMode
  ) => Promise<unknown>;
}

export const GetSalaryProjectionAction = (
  projectionService: ProjectionService
): IGetSalaryProjectionAction => {
  return {
    execute: (revenueId, months = 12, mode = 'cumulative') => {
      return new Promise(async (resolve, reject) => {
        try {
          // Validar parámetros
          if (months < 1 || months > 60) {
            throw new Error('Los meses deben estar entre 1 y 60');
          }

          if (mode !== 'cumulative' && mode !== 'simple') {
            throw new Error('El modo debe ser "cumulative" o "simple"');
          }

          const result = await projectionService.projectSalary(
            revenueId,
            months,
            mode
          );
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
