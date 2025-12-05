import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../../../../helpers/api";
import { createHashMap } from "../../../../helpers/utils";
import { IIncreaseRateActions } from "../../core/actions/actionsProvider";

export const IPCController = ({
  registerIPC,
  getIPCHistory,
  getAll,
}: Pick<IIncreaseRateActions, "registerIPC" | "getIPCHistory" | "getAll">) => {
  const errorResponses = createHashMap(
    {},
    (res: Response, error: Error) => ErrorResponse(res, error)
  );

  return {
    registerIPC(req: Request, res: Response) {
      const { period, rate } = req.body;

      if (!period || !rate) {
        ErrorResponse(res, new Error("period and rate are required"), 400);
        return;
      }

      if (isNaN(rate)) {
        ErrorResponse(res, new Error("rate must be a number"), 400);
        return;
      }

      const registerExecution = registerIPC.execute(period, Number(rate));

      registerExecution
        .then((ipc) => {
          const message = "IPC registrado correctamente";
          SuccessResponse(res, 201, message, ipc);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },

    getIPCHistory(req: Request, res: Response) {
      const { start, end } = req.query;

      if (!start || !end) {
        ErrorResponse(res, new Error("start and end query parameters are required"), 400);
        return;
      }

      const getHistoryExecution = getIPCHistory.execute(start as string, end as string);

      getHistoryExecution
        .then((ipcData) => {
          const message = "Historial de IPC obtenido con éxito";
          SuccessResponse(res, 200, message, ipcData);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },

    getLatestIPC(req: Request, res: Response) {
      // Get all IPCs and return the most recent one
      const getAllExecution = getAll.execute({});

      getAllExecution
        .then((ipcData: any) => {
          if (!ipcData || ipcData.length === 0) {
            ErrorResponse(res, new Error("No IPC data found"), 404);
            return;
          }

          // Sort by date descending and get the first one
          const sorted = ipcData.sort((a: any, b: any) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });

          const message = "IPC más reciente obtenido con éxito";
          SuccessResponse(res, 200, message, sorted[0]);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
  };
};
