import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../../../../helpers/api";
import { createHashMap } from "../../../../helpers/utils";
import { IRevenueActions } from "../../core/actions/actionsProvider";
import { InsufficientIPCDataException } from "../../core/exceptions/InsufficientIPCDataException";

export const SalaryController = ({
  calculateSalaryIncrease,
  applySalaryIncrease,
  getPendingIncreases,
}: Pick<
  IRevenueActions,
  "calculateSalaryIncrease" | "applySalaryIncrease" | "getPendingIncreases"
>) => {
  const errorResponses = createHashMap(
    {
      [InsufficientIPCDataException.name]: (res: Response, error: Error) =>
        ErrorResponse(res, error, 400),
    },
    (res: Response, error: Error) => ErrorResponse(res, error)
  );

  return {
    calculateIncrease(req: Request, res: Response) {
      const { id } = req.params;
      const calculateExecution = calculateSalaryIncrease.execute(id);

      calculateExecution
        .then((result) => {
          const message = "Aumento salarial calculado correctamente";
          SuccessResponse(res, 200, message, result);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },

    applyIncrease(req: Request, res: Response) {
      const { id } = req.params;
      const { newSalary } = req.body;

      if (!newSalary || isNaN(newSalary)) {
        ErrorResponse(res, new Error("newSalary is required and must be a number"), 400);
        return;
      }

      const applyExecution = applySalaryIncrease.execute(id, Number(newSalary));

      applyExecution
        .then((revenue) => {
          const message = "Aumento salarial aplicado correctamente";
          SuccessResponse(res, 200, message, revenue);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },

    getPendingIncreases(req: Request, res: Response) {
      const { userId } = req.query;

      if (!userId) {
        ErrorResponse(res, new Error("userId query parameter is required"), 400);
        return;
      }

      const getPendingExecution = getPendingIncreases.execute(userId as string);

      getPendingExecution
        .then((revenues) => {
          const message = "Ingresos con aumentos pendientes obtenidos con éxito";
          SuccessResponse(res, 200, message, revenues);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
  };
};
