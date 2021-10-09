import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import MenuPage from "./components/Menu";
import About from "./components/About";
import Signup from "./components/Signup";

const App = () => {
  return (
    <body>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/menu" component={MenuPage}></Route>
          <Route exact path="/about" component={About}></Route>
          <Route exact path="/signup" component={Signup}></Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </body>
  );
};

export default App;
