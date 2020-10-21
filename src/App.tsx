import axios from "axios";
import React, { Component } from "react";
import { IGame } from "./interfaces/IGame";

interface IProps {}
interface IState {
  games: Array<IGame>;
}

class App extends Component<IProps, IState> {
  async componentDidMount() {
    axios
      .get("api?casoDeUso=ManterGame", {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((res) => {
        console.log(res.data);

        this.setState({ games: res.data });
      })
      .catch(() => console.log("erro:erro"));
  }

  render() {
    // this.componentDidMount();
    // const { games } = this.state;
    // console.log(this.state.games);

    return (
      <></>
      // <div>
      //   <h1>Listar os Filmes</h1>
      //   {filmes.map((filme) => (
      //     <li key={filme.id}>
      //       <h2>
      //         <strong>Título: </strong>
      //         {filme.name}
      //       </h2>
      //       <p>{filme.url}</p>
      //     </li>
      //   ))}
      // </div>
    );
  }
}

export default App;
