import React from "react";
import { Container, Table } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IApi } from "../../interfaces/IApi";
import { Menu } from "../menu/Menu";

import "./buscar.css";

interface IProps {}
interface IState<Entidade> {
  camposNomes: Array<{ nome: string; pk: number }>;
  entidades: Array<Entidade>;
}

export abstract class Buscar<Entidade> extends React.Component<
  IProps,
  IState<Entidade>
> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      camposNomes: [],
      entidades: [],
    };
    this.pesquisarSemelhantesDigitado = this.pesquisarSemelhantesDigitado.bind(
      this
    );
    this.pesquisarSemelhantesAposApertarEnter = this.pesquisarSemelhantesAposApertarEnter.bind(
      this
    );
    this.pesquisarEntidade = this.pesquisarEntidade.bind(this);
  }

  protected abstract nomeEntidade(): string;
  protected abstract getApi(): IApi;
  protected abstract getCabecalhoCamposCol(): Array<string>;
  protected abstract getCamposCol(): JSX.Element[];

  protected MontarResultadoSemelhantesDigitado() {
    return this.state.camposNomes.map((data) => {
      return (
        <li key={data.pk}>
          <button onClick={this.pesquisarEntidade} value={data.pk}>
            {data.nome}
          </button>
        </li>
      );
    });
  }

  protected formatoLinhas(col: JSX.Element, id: number) {
    return (
      <tr key={id}>
        {col}
        <td>
          <Link to={"/" + this.nomeEntidade() + "/deletar/" + id}>
            <BsFillTrashFill />
          </Link>
        </td>
        <td>
          <Link to={"/" + this.nomeEntidade() + "/renomear/" + id}>
            <FaPencilAlt />
          </Link>
        </td>
      </tr>
    );
  }

  private colTabale(): JSX.Element {
    let cols = this.getCabecalhoCamposCol().map((data) => (
      <th key={data}>{data}</th>
    ));

    return (
      <tr>
        <th>#</th>
        {cols}
      </tr>
    );
  }

  pesquisarSemelhantesAposApertarEnter(e: any) {
    if (e.key === "Enter") {
      console.log("enter press here! ");
      this.getApi()
        .getListarSemelhantes(e.target.value)
        .then((res) => {
          console.log("parece q deu certo");
          console.log(res.data);
          this.setState({ entidades: res.data });
        })
        .catch((err) => {
          console.log("Deu ruim");
          console.log(err);
        })
        .finally(() => {
          this.setState({ camposNomes: [] });
        });
    }
  }

  pesquisarEntidade(e: any) {
    console.log(e.target.value);
    this.getApi()
      .getById(e.target.value)
      .then((res) => {
        console.log("parece q deu certo");
        console.log(res.data);
        this.setState({ entidades: [res.data] });
      })
      .catch((err) => {
        console.log("Deu ruim");
        console.log(err);
      })
      .finally(() => {
        this.setState({ camposNomes: [] });
      });
  }

  pesquisarSemelhantesDigitado(e: any) {
    console.log(e.target.value);
    if (e.target.value === "") {
      this.setState({ camposNomes: [] });
    } else {
      this.getApi()
        .getListarSemelhantes(e.target.value)
        .then((res) => {
          console.log("parece q deu certo");
          console.log(res.data);
          this.setState({ camposNomes: res.data });
        })
        .catch((err) => {
          console.log("Deu ruim");
          console.log(err);
        });
    }
  }

  render(): JSX.Element {
    return (
      <>
        <Menu />
        <Container>
          <input
            type="text"
            id="myInput"
            placeholder={`pesquisar por nomes de ${this.nomeEntidade()}`}
            onChange={this.pesquisarSemelhantesDigitado}
            onKeyPress={this.pesquisarSemelhantesAposApertarEnter}
          />

          <ul id="myUL">{this.MontarResultadoSemelhantesDigitado()}</ul>

          <div style={{ marginTop: "20px" }}>
            <Table striped bordered hover size="sm" variant="light">
              <thead>{this.colTabale()}</thead>
              <tbody>{this.getCamposCol()}</tbody>
            </Table>
          </div>
        </Container>
      </>
    );
  }
}
