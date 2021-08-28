// importando o firebase
import firebase from "firebase";
import { createContext, useState, useEffect } from "react";
// importandos os componentes para criar as rotas do react router dom
import { Route, BrowserRouter, Switch } from "react-router-dom";

// importando a página de home
import { Home } from "./pages/Home";
// importando a página de nova sala
import { NewRoom } from "./pages/NewRoom";
// importando a página de room
import { Room } from "./pages/Room";
// importando a autenticação do firebase
// import { auth } from "./services/firebase";

import { AuthcontextProvider } from "./contexts/AuthContext";
import { AdminRoom } from "./pages/AdminRoom";



function App() {

  return (
    // definindo as rotas
    <BrowserRouter>
      <AuthcontextProvider>
        <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
        <Route path="/rooms/:id" component={Room} />

        <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthcontextProvider>
    </BrowserRouter>
  );
}

export default App;
