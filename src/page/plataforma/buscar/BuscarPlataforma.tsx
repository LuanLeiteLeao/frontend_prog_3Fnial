import { Buscar } from "../../../components/crud/Buscar";
import { IApi } from "../../../interfaces/IApi";
import { IGame } from "../../../interfaces/IGame";
import React from "react";
import { PlataformaApi } from "../../../api/apis/PlataformaApi";

export class BuscarPlataforma extends Buscar<IGame> {
  protected nomeEntidade(): string {
    return "plataforma";
  }
  protected getApi(): IApi {
    return new PlataformaApi();
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
