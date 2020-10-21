import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Home from "./page/home/Home";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { ListarGame } from "./page/game/listar/ListarGame";
import { ListarGenero } from "./page/genero/listar/ListarGenero";
import { ListarPlataforma } from "./page/plataforma/listar/ListarPlataforma";
import { InserirPlataforma } from "./page/plataforma/inserir/InserirPlataforma";
import { InserirGame } from "./page/game/inserir/InserirGame";
import { DeletarGenero } from "./page/genero/deletar/DeletarPlataforma";
import { InserirGenero } from "./page/genero/inserir/InserirPlataforma";
import { DeletarPlataforma } from "./page/plataforma/deletar/DeletarPlataforma";
import { DeletarGame } from "./page/game/deletar/DeletarGame";
import { BuscarGame } from "./page/game/buscar/BuscarGame";
import { BuscarGenero } from "./page/genero/buscar/BuscarGenero";
import { BuscarPlataforma } from "./page/plataforma/buscar/BuscarPlataforma";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={Home} />
      {/* games rotas */}
      <Route exact path="/game/listar" component={ListarGame} />
      <Route exact path="/game/novo" component={InserirGame} />
      <Route exact path="/game/deletar/:id" component={DeletarGame} />
      <Route exact path="/game/buscar" component={BuscarGame} />
      {/* generos rotas */}
      <Route path="/genero/listar" component={ListarGenero} />
      <Route path="/genero/novo" component={InserirGenero} />
      <Route path="/genero/deletar/:id" component={DeletarGenero} />
      <Route exact path="/genero/buscar" component={BuscarGenero} />
      {/* plataformas Rotas */}
      <Route path="/plataforma/listar" component={ListarPlataforma} />
      <Route path="/plataforma/novo" component={InserirPlataforma} />
      <Route path="/plataforma/deletar/:id" component={DeletarPlataforma} />
      <Route exact path="/plataforma/buscar" component={BuscarPlataforma} />
      {/* test */}
      <Route path="/buscar" component={BuscarGame} />
    </Switch>
  </BrowserRouter>,

  document.getElementById("root")
);
