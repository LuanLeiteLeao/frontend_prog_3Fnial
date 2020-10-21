import { AxiosResponse } from "axios";

export interface IApi {
  get: () => Promise<AxiosResponse<any>>;
  post: (json: []) => Promise<AxiosResponse<any>>;
  getById: (id: number) => Promise<AxiosResponse<any>>;
  delete: (id: number) => Promise<AxiosResponse<any>>;
  getListarSemelhantes: (nome: string) => Promise<AxiosResponse<any>>;
}
