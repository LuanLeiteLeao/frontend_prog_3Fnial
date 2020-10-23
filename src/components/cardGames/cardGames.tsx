import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

import { IGame } from "../../interfaces/IGame";
import { ApiInstance } from "../../api/ApiInstance";

interface IProps {}
interface IState {
  games: Array<IGame>;
}

export class CardGames extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      games: [],
    };
  }
  componentDidMount() {
    ApiInstance.get("api?casoDeUso=ManterGame")
      .then((res) => {
        console.log(res.data);
        const games = res.data;
        this.setState({ games });
      })
      .catch((err) => console.log("erro: " + err));
  }

  private card(game: IGame) {
    return (
      <Card key={game.pk} style={{ margin: "12px" }}>
        <iframe
          title="videos"
          width="auto"
          height="315"
          src="https://www.youtube-nocookie.com/embed/NRpNHcniTfE"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <Card.Body>
          <Card.Title>
            <h1 style={{ color: "#6a717c" }}>{game.nome}</h1>
          </Card.Title>

          <h5>Criação: {game.criacao}</h5>
          <h5>Data de Lançamento: {game.dataLancamento}</h5>
          {/* {game.generos} */}
          <h3>Descrição</h3>
          <h5>{game.isJogoDoAno}</h5>
          {/* {game.plataformas} */}
          <Card.Text>{game.descricao}</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  render(): JSX.Element {
    return (
      <Container>
        <Row>
          <Col>{this.state.games.map((game) => this.card(game))}</Col>
        </Row>
      </Container>
    );
  }
}
