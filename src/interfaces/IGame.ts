import { IGenero } from "./IGenero";
import { IPlataforma } from "./IPlataforma";

export interface IGame {
  pk: number;
  criacao?: Date;
  modificacao?: Date;
  nome: string;
  descricao: string;
  dataLancamento: Date;
  isJogoDoAno: boolean;
  plataformas: Array<IPlataforma>;
  generos: Array<IGenero>;
}
