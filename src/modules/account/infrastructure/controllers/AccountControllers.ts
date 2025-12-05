import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../../../../helpers/api";
import { createHashMap } from "../../../../helpers/utils";
import { IAccountActions } from "../../core/actions/actionsProvider";
import { InvalidIdException } from "../../core/exceptions/InvalidIdException";
import { AccountNotExistException } from "../../core/exceptions/AccountNotExistException";
import { InvalidFieldException } from "../../core/exceptions/InvalidFieldException";

const name = "Cuenta";
const pronoun = "a";

export const AccountControllers = ({
  save,
  edit,
  remove,
  getAll,
  getById,
  getOne,
}: IAccountActions) => {
  const errorResponses = createHashMap(
    {
      [AccountNotExistException.name]: (res: Response, error: Error) =>
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
        .then((account) => {
          const message = `${name} cread${pronoun} correctamente`;
          SuccessResponse(res, 201, message, account);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    edit(req: Request, res: Response) {
      const editExecution = edit.execute(req.body, req.params.id);
      editExecution
        .then((account) => {
          const message = `${name} editad${pronoun} correctamente`;
          SuccessResponse(res, 200, message, account);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    remove(req: Request, res: Response) {
      const deleteExecution = remove.execute(req.params.id);
      deleteExecution
        .then((account) => {
          const message = `${name} eliminad${pronoun} correctamente`;
          SuccessResponse(res, 200, message, account);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    getAll(req: Request, res: Response) {
      const getExecution = getAll.execute(req.query);
      getExecution
        .then((accounts) => {
          const message = `${name}s obtenid${pronoun}s con éxito`;
          SuccessResponse(res, 200, message, accounts);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    getById(req: Request, res: Response) {
      const getByIdExecution = getById.execute(req.params.id);
      const message = `${name} obtenid${pronoun} con éxito`;
      getByIdExecution
        .then((account) => {
          SuccessResponse(res, 200, message, account);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    getOne(req: Request, res: Response) {
      const getOneExecution = getOne.execute(req.body);
      const message = `${name} obtenid${pronoun} con éxito`;
      getOneExecution
        .then((account) => {
          SuccessResponse(res, 200, message, account);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
  };
};
