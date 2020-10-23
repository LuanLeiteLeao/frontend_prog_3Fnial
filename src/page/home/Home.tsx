import React from "react";
import { Menu } from "../../components/menu/Menu";
import { CardGames } from "../../components/cardGames/cardGames";

import "./styles.css";
class Home extends React.Component {
  

  render(): JSX.Element {
    return (
      <>
        <Menu />
        <CardGames />
      </>
    );
  }
}

export default Home;
