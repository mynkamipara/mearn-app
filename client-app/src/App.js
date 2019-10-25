import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import TodosList from "./components/todos-list.component";
import EditTodo from "./components/edit-todo.component";
import CreateTodo from "./components/create-todo.component";
import CreateUser from "./components/create-with-validation.component";
import RegisterUser from "./components/register-user.component";
import Login from "./components/login-user.component";

import logo from "./mk5logo.png";

function App() {
  return (
    <Router>
      
      <div className="container">
        <nav className="navbar navbar-expand-md bg-dark navbar-dark">
         
            <img
              src={logo}
              width="30"
              height="30"
              alt="CodingTheSmartWay.com"
            />
         
          <Link to="/" className="navbar-brand">mk5tech</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
              <Link to="/" className="nav-link">LIST</Link>
              </li>
              <li className="nav-item">
              <Link to="/create" className="nav-link">Create</Link>
              </li>
            </ul>
            <ul className="navbar-nav mr-2">
              <li className="nav-item">
              <Link to="/register" className="nav-link">Register</Link>
              </li>
              <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Route path="/" exact component={TodosList} />
        <Route path="/edit/:id" component={EditTodo} />
        <Route path="/create" component={CreateUser} />
        <Route path="/delete/:id" component={CreateTodo} />
        <Route path="/register" component={RegisterUser} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
