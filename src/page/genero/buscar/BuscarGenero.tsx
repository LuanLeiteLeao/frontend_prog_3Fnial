import { Buscar } from "../../../components/crud/Buscar";
import { IApi } from "../../../interfaces/IApi";
import { IGame } from "../../../interfaces/IGame";
import React from "react";
import { GeneroApi } from "../../../api/apis/GeneroApi";

export class BuscarGenero extends Buscar<IGame> {
  protected nomeEntidade(): string {
    return "genero";
  }
  protected getApi(): IApi {
    return new GeneroApi();
  }

  protected getCabecalhoCamposCol(): string[] {
    return ["Nome", "Criação", "Modificação"];
  }
  protected getCamposCol(): JSX.Element[] {
    console.log(this.state.entidades);
    let td = this.state.entidades.map((data) => {
      return this.formatoLinhas(
        <>
          <td>{data.pk}</td>
          <td>{data.nome}</td>
          <td>{data.criacao}</td>
          <td>{data.modificacao}</td>
        </>,
        data.pk
      );
    });
    return td;
  }
}
