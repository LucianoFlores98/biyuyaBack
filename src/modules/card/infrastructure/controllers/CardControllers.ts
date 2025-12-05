import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../../../../helpers/api";
import { createHashMap } from "../../../../helpers/utils";
import { ICardActions } from "../../core/actions/actionsProvider";
import { InvalidIdException } from "../../core/exceptions/InvalidIdException";
import { CardNotExistException } from "../../core/exceptions/CardNotExistException";
import { InvalidFieldException } from "../../core/exceptions/InvalidFieldException";

const name = "Tarjeta";
const pronoun = "a";

export const CardControllers = ({
  save,
  edit,
  remove,
  getAll,
  getById,
  getOne,
}: ICardActions) => {
  const errorResponses = createHashMap(
    {
      [CardNotExistException.name]: (res: Response, error: Error) =>
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
        .then((card) => {
          const message = `${name} cread${pronoun} correctamente`;
          SuccessResponse(res, 201, message, card);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    edit(req: Request, res: Response) {
      const editExecution = edit.execute(req.body, req.params.id);
      editExecution
        .then((card) => {
          const message = `${name} editad${pronoun} correctamente`;
          SuccessResponse(res, 200, message, card);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    remove(req: Request, res: Response) {
      const deleteExecution = remove.execute(req.params.id);
      deleteExecution
        .then((card) => {
          const message = `${name} eliminad${pronoun} correctamente`;
          SuccessResponse(res, 200, message, card);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    getAll(req: Request, res: Response) {
      const getExecution = getAll.execute(req.query);
      getExecution
        .then((cards) => {
          const message = `${name}s obtenid${pronoun}s con éxito`;
          SuccessResponse(res, 200, message, cards);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    getById(req: Request, res: Response) {
      const getByIdExecution = getById.execute(req.params.id);
      const message = `${name} obtenid${pronoun} con éxito`;
      getByIdExecution
        .then((card) => {
          SuccessResponse(res, 200, message, card);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    getOne(req: Request, res: Response) {
      const getOneExecution = getOne.execute(req.body);
      const message = `${name} obtenid${pronoun} con éxito`;
      getOneExecution
        .then((card) => {
          SuccessResponse(res, 200, message, card);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
  };
};
