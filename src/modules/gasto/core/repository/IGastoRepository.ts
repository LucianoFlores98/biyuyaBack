import IGasto from "../entities/IGasto";

export interface IGastoRepository {
  save: (gasto: IGasto) => Promise<unknown>;
  edit: (gasto: IGasto, id: string) => Promise<unknown>;
  remove: (id: string) => Promise<unknown>;
  getAll: (query: unknown) => Promise<unknown>;
  getOne: (query: unknown) => Promise<unknown>;
  getById: (id: string) => Promise<unknown>;
}
