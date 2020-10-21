export interface ICrudAcoes {
  nome: string;
  acoApi: string;
  acoes: Array<IAcoes>;
}

interface IAcoes {
  nome: string;
  url: string;
}
