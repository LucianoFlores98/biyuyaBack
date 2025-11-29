import ICard from "../entities/ICard";

export interface ICardRepository {
  save: (card: ICard) => Promise<any>;
  edit: (card: ICard, id: string) => Promise<any>;
  remove: (id: string) => Promise<any>;
  getAll: (query: any) => Promise<any>;
  getOne: (query: any) => Promise<any>;
  getById: (id: string) => Promise<any>;
}
