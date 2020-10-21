import React from "react";
import { IGame } from "../../../interfaces/IGame";
import { Listar } from "../../../components/crud/Listar";

export class ListarGame extends Listar<IGame> {
  protected getNomeAcaoApi(): string {
    return "ManterGame";
  }
  protected getEntidadeNome(): string {
    return "game";
  }
  protected getCamposCol(): JSX.Element[] {
    console.log(this.state.entidades);
    let td = this.state.entidades.map((data) => {
      return this.formatoLinhas(
        <>
          <td>{data.pk}</td>
          <td>{data.nome}</td>
          <td>{data.dataLancamento}</td>
          <td>{data.descricao}</td>
          <td>
            {data.isJogoDoAno ? "Eleito jogo do ano" : "Não Eleito jogo do ano"}
          </td>
          <td>{data.plataformas?.map((data) => data.nome + "  ")}</td>
          <td>{data.generos?.map((data) => data.nome + "  ")}</td>
          <td>{data.criacao}</td>
          <td>{data.modificacao}</td>
        </>,
        data.pk
      );
    });
    return td;
  }
  protected getCabecalhoCamposCol(): string[] {
    return [
      "Nome",
      "Data de Lancamento",
      "Descricao",
      "Jogo Do Ano",
      "Plataformas",
      "Gêneros",
      "Criação",
      "Modificação",
    ];
  }
}
