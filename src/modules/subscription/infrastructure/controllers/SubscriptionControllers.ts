import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../../../../helpers/api";
import { createHashMap } from "../../../../helpers/utils";
import { ISubscriptionActions } from "../../core/actions/actionsProvider";
import { InvalidIdException } from "../../core/exceptions/InvalidIdException";
import { SubscriptionNotExistException } from "../../core/exceptions/SubscriptionNotExistException";
import { InvalidFieldException } from "../../core/exceptions/InvalidFieldException";

const name = "Suscripción";
const pronoun = "a";

export const SubscriptionControllers = ({
  save,
  edit,
  remove,
  getAll,
  getById,
  getOne,
}: ISubscriptionActions) => {
  const errorResponses = createHashMap(
    {
      [SubscriptionNotExistException.name]: (res: Response, error: Error) =>
        ErrorResponse(res, error, 404),
      [InvalidIdException.name]: (res: Response, error: Error) =>
      [InvalidFieldException.name]: (res: Response, error: Error) =>
        ErrorResponse(res, error, 400),
        ErrorResponse(res, error, 400),
    },
    (res: Response, error: Error) => ErrorResponse(res, error)
  );

  return {
    save(req: Request, res: Response) {
      const saveExecution = save.execute(req.body);
      saveExecution
        .then((subscription) => {
          const message = `${name} cread${pronoun} correctamente`;
          SuccessResponse(res, 201, message, subscription);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    edit(req: Request, res: Response) {
      const editExecution = edit.execute(req.body, req.params.id);
      editExecution
        .then((subscription) => {
          const message = `${name} editad${pronoun} correctamente`;
          SuccessResponse(res, 200, message, subscription);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    remove(req: Request, res: Response) {
      const deleteExecution = remove.execute(req.params.id);
      deleteExecution
        .then((subscription) => {
          const message = `${name} eliminad${pronoun} correctamente`;
          SuccessResponse(res, 200, message, subscription);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    getAll(req: Request, res: Response) {
      const getExecution = getAll.execute(req.query);
      getExecution
        .then((subscriptions) => {
          const message = `${name}es obtenid${pronoun}s con éxito`;
          SuccessResponse(res, 200, message, subscriptions);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    getById(req: Request, res: Response) {
      const getByIdExecution = getById.execute(req.params.id);
      const message = `${name} obtenid${pronoun} con éxito`;
      getByIdExecution
        .then((subscription) => {
          SuccessResponse(res, 200, message, subscription);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    getOne(req: Request, res: Response) {
      const getOneExecution = getOne.execute(req.body);
      const message = `${name} obtenid${pronoun} con éxito`;
      getOneExecution
        .then((subscription) => {
          SuccessResponse(res, 200, message, subscription);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
  };
};
