import React from "react";
import { Container, Table, Button } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { Link, RouteComponentProps } from "react-router-dom";
import { IApi } from "../../interfaces/IApi";
import { Menu } from "../menu/Menu";

interface IStates<IEntidade> {
  entidade?: IEntidade;
}
interface RouteInfo {
  id: string;
}
interface ComponentProps extends RouteComponentProps<RouteInfo> {}

export abstract class Deletar<IEntidade> extends React.Component<
  ComponentProps,
  IStates<IEntidade>
> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      entidade: undefined,
    };
    this.deletarRegistro = this.deletarRegistro.bind(this);
  }

  protected abstract getApi(): IApi;
  protected abstract getColunasCampos(): Array<{ nome: string; data: any }>;
  protected abstract getNomeEntidade(): string;

  private montarTabela() {
    return this.getColunasCampos().map((data) => {
      return (
        <tr key={data.nome}>
          <td>{data.nome}</td>
          <td>{data.data}</td>
        </tr>
      );
    });
  }

  componentDidMount() {
    const idDaPagina = parseInt(this.props.match.params.id);
    this.getApi()
      .getById(idDaPagina)
      .then((res) => {
        this.setState({ entidade: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private deletarRegistro(e: any) {
    const idDaPagina = parseInt(this.props.match.params.id);
    const url = "/" + this.getNomeEntidade().toLowerCase() + "/listar";
    this.getApi()
      .delete(idDaPagina)
      .then((res) => {
        console.log(res.data);
        alert(res.data.mensagemCliente);
      })
      .catch((err) => {
        const response = JSON.parse(err.request.response);
        console.log(response);
        alert(response.mensagemCliente);
      })
      .finally(() => {
        window.location.assign(url);
      });
  }

  render(): JSX.Element {
    return (
      <>
        <Menu />
        <Container>
          <h1 style={{ textAlign: "center", marginTop: "30px" }}>
            Deletar {this.getNomeEntidade()}
          </h1>
          <Table striped bordered hover size="sm" variant="light">
            <tbody>{this.montarTabela()}</tbody>
          </Table>
          <Button variant="danger" onClick={this.deletarRegistro}>
            Deletar <BsFillTrashFill />
          </Button>{" "}
          <Link to="/">
            <Button variant="info">
              Cancelar <MdCancel />
            </Button>{" "}
          </Link>
        </Container>
      </>
    );
  }
}
