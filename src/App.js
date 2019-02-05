import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Customers from "./components/customers";
import Pricing from "./components/pricing/pricing";
import NotFound from "./components/not-found";
import Home from "./components/home/home";
import NavBar from "./components/navbar";
import Features from "./components/features";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Logout from "./components/logout";
import { getCurrentUser } from "./services/authService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Projects from "./components/projects";
import NewProject from "./components/newproject";
import DashBoard from "./components/dashboard";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }
  render() {
    return (
      <React.Fragment>
        <NavBar user={this.state.user} />
        <ToastContainer />
        <main className="">
          <Switch>
            <Route path="/customers" component={Customers} />
            <Route path="/pricing" component={Pricing} />
            <Route path="/features" component={Features} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={Register} />
            <Route path="/projects/:id" component={DashBoard} />
            <Route path="/projects" exact component={Projects} />
            <Route path="/new-project" exact component={NewProject} />
            <Route path="/not-found" exact component={NotFound} />
            <Route path="/" exact component={Home} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
