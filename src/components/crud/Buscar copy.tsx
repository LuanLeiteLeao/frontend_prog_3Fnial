import React from "react";
import { Container } from "react-bootstrap";
import { GameApi } from "../../api/apis/GameApi";
import { IGame } from "../../interfaces/IGame";
import { Menu } from "../menu/Menu";

import "./buscar.css";

interface IProps {}
interface IState {
  camposNomes: Array<IGame>;
}

export class Buscar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      camposNomes: [],
    };
    this.pesquisar = this.pesquisar.bind(this);
  }

  nomeEntidade(): string {
    return "Games";
  }

  pesquisar(e: any) {
    console.log(e.target.value);
    if (e.target.value == "") {
      this.setState({ camposNomes: [] });
    } else {
      new GameApi()
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
  componentDidMount() {}

  render(): JSX.Element {
    return (
      <>
        <Menu />
        <Container>
          <input
            type="text"
            id="myInput"
            placeholder={`pesquisar por nomes de ${this.nomeEntidade()}`}
            onChange={this.pesquisar}
          />

          <ul id="myUL">
            {this.state.camposNomes.map((data) => {
              return (
                <li key={data.pk}>
                  <a>{data.nome}</a>
                </li>
              );
            })}
          </ul>
        </Container>
      </>
    );
  }
}
