import React from "react";
import { Listar } from "../../../components/crud/Listar";
import { IGenero } from "../../../interfaces/IGenero";

export class ListarPlataforma extends Listar<IGenero> {
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
  protected getEntidadeNome(): string {
    return "plataforma";
  }
  protected getNomeAcaoApi(): string {
    return "ManterPlataforma";
  }
}
