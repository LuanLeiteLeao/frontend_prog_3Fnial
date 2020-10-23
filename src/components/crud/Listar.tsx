import React from "react";
import { Table } from "react-bootstrap";
import { ApiInstance } from "../../api/ApiInstance";
import { FaPencilAlt } from "react-icons/fa";
import { BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Menu } from "../menu/Menu";

interface IProps {}
interface IStates<Entidade> {
  entidades: Array<Entidade>;
}

export abstract class Listar<Entidade> extends React.Component<
  IProps,
  IStates<Entidade>
> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      entidades: [],
    };
  }
  componentDidMount() {
    console.log(this.getNomeAcaoApi());
    ApiInstance.get("api?casoDeUso=" + this.getNomeAcaoApi())
      .then((res) => {
        const entidades = res.data;
        this.setState({ entidades });
        console.log(res.data);
        console.log("====================================");
        console.log(this.state.entidades);
        console.log("====================================");
      })
      .catch((err) => console.log("erro: " + err));
  }

  protected abstract getCabecalhoCamposCol(): Array<string>;
  protected abstract getCamposCol(): JSX.Element[];
  protected abstract getEntidadeNome(): string;
  protected abstract getNomeAcaoApi(): string;

  protected formatoLinhas(col: JSX.Element, id: number) {
    return (
      <tr key={id}>
        {col}
        <td>
          <Link to={"/" + this.getEntidadeNome() + "/deletar/" + id}>
            <BsFillTrashFill />
          </Link>
        </td>
        <td>
          <Link to={"/" + this.getEntidadeNome() + "/editar/" + id}>
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

  render(): JSX.Element {
    return (
      <>
        <Menu />
        <div style={{ margin: "20px" }}>
          <Table striped bordered hover size="sm" variant="light">
            <thead>{this.colTabale()}</thead>
            <tbody>{this.getCamposCol()}</tbody>
          </Table>
        </div>
      </>
    );
  }
}
