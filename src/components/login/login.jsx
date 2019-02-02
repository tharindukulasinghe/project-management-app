import React, { Component } from "react";
import "./login.css";
import { login } from "../../services/authService";

class Login extends Component {
  state = {
    account: {
      email: "",
      password: "",
      errors: {},
      loginerror: null
    }
  };

  handleChange = e => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account: account, loginerror: null });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("ok");
    this.doSubmit();
  };

  doSubmit = async () => {
    try {
      await login(this.state.account.email, this.state.account.password);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        this.setState({ loginerror: error.response.data });
      }
    }
  };
  render() {
    return (
      <div className="text-center">
        <form className="form-signin" onSubmit={this.handleSubmit}>
          {this.state.loginerror && (
            <div className="alert alert-danger" role="alert">
              {this.state.loginerror}
            </div>
          )}
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="inputEmail" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            name="email"
            autoFocus
            value={this.state.account.email}
            onChange={this.handleChange}
          />
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            name="password"
            required
            value={this.state.account.password}
            onChange={this.handleChange}
          />

          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted">
            &copy; Project Management System
          </p>
        </form>
      </div>
    );
  }
}

export default Login;
