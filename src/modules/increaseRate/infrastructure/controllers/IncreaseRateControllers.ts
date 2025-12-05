import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../../../../helpers/api";
import { createHashMap } from "../../../../helpers/utils";
import { IIncreaseRateActions } from "../../core/actions/actionsProvider";
import { InvalidIdException } from "../../core/exceptions/InvalidIdException";
import { InvalidFieldException } from "../../core/exceptions/InvalidFieldException";
import { IncreaseRateNotExistException } from "../../core/exceptions/IncreaseRateNotExistException";

const name = "Tasa de incremento";
const pronoun = "a";

export const IncreaseRateControllers = ({
  save,
  edit,
  remove,
  getAll,
  getById,
  getOne,
}: IIncreaseRateActions) => {
  const errorResponses = createHashMap(
    {
      [IncreaseRateNotExistException.name]: (res: Response, error: Error) =>
        ErrorResponse(res, error, 404),
      [InvalidIdException.name]: (res: Response, error: Error) =>
        ErrorResponse(res, error, 400),
      [InvalidFieldException.name]: (res: Response, error: Error) =>
        ErrorResponse(res, error, 400),
    },
    (res: Response, error: Error) => ErrorResponse(res, error)
  );

  return {
    save(req: Request, res: Response) {
      const saveExecution = save.execute(req.body);
      saveExecution
        .then((increaseRate) => {
          const message = `${name} cread${pronoun} correctamente`;
          SuccessResponse(res, 201, message, increaseRate);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    edit(req: Request, res: Response) {
      const editExecution = edit.execute(req.body, req.params.id);
      editExecution
        .then((increaseRate) => {
          const message = `${name} editad${pronoun} correctamente`;
          SuccessResponse(res, 200, message, increaseRate);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    remove(req: Request, res: Response) {
      const deleteExecution = remove.execute(req.params.id);
      deleteExecution
        .then((increaseRate) => {
          const message = `${name} eliminad${pronoun} correctamente`;
          SuccessResponse(res, 200, message, increaseRate);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    getAll(req: Request, res: Response) {
      const getExecution = getAll.execute(req.query);
      getExecution
        .then((increaseRates) => {
          const message = `${name}s obtenid${pronoun}s con éxito`;
          SuccessResponse(res, 200, message, increaseRates);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    getById(req: Request, res: Response) {
      const getByIdExecution = getById.execute(req.params.id);
      const message = `${name} obtenid${pronoun} con éxito`;
      getByIdExecution
        .then((increaseRate) => {
          SuccessResponse(res, 200, message, increaseRate);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    getOne(req: Request, res: Response) {
      const getOneExecution = getOne.execute(req.body);
      const message = `${name} obtenid${pronoun} con éxito`;
      getOneExecution
        .then((increaseRate) => {
          SuccessResponse(res, 200, message, increaseRate);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
  };
};
