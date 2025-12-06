import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../../../../helpers/api";
import { createHashMap } from "../../../../helpers/utils";
import { IAnalyticsActions } from "../../core/actions/actionsProvider";

const name = "Proyección";
const pronoun = "a";

export const AnalyticsControllers = ({
  getSalaryProjection,
}: IAnalyticsActions) => {
  const errorResponses = createHashMap(
    {},
    (res: Response, error: Error) => ErrorResponse(res, error)
  );

  return {
    getSalaryProjection(req: Request, res: Response) {
      const { revenueId } = req.params;
      const months = req.query.months ? parseInt(req.query.months as string) : 12;
      const mode = (req.query.mode as 'cumulative' | 'simple') || 'cumulative';

      const execution = getSalaryProjection.execute(revenueId, months, mode);
      execution
        .then((projection) => {
          const message = `${name} de salario obtenid${pronoun} con éxito`;
          SuccessResponse(res, 200, message, projection);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
  };
};
