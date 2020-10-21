import { ICrudAcoes } from "../../interfaces/ICrudAcoes";

class CrudAcoes {
  private crudAcoes: Array<ICrudAcoes> = [];
  constructor(entidades: Array<[string, string]>) {
    entidades.map((data) =>
      this.crudAcoes.push(this.jsonCrud(data[0], data[1]))
    );
  }

  public getListCrudAcoes() {
    return this.crudAcoes;
  }

  private jsonCrud(entidade: string, acoApi: string): ICrudAcoes {
    // deixar tudo minusculo na URL
    entidade = entidade.toLocaleLowerCase();
    // Nome formato
    let nome = entidade.charAt(0).toUpperCase() + entidade.slice(1);
    let crudAcoes: ICrudAcoes = {
      nome: nome,
      acoApi: acoApi,
      acoes: [
        { nome: "Listar Todos", url: "/" + entidade + "/listar" },
        { nome: "Novo", url: "/" + entidade + "/novo" },
        { nome: "Buscar", url: "/" + entidade + "/buscar" },
      ],
    };
    return crudAcoes;
  }
}

export const crudAcoesPage = new CrudAcoes([
  ["game", "ManterGame"],
  ["genero", "ManterGame"],
  ["plataforma", "ManterGame"],
]);
