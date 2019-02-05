import React, { Component } from "react";
import "./register.css";
import { register } from "../../services/userService";
import { loginWithJwt } from "../../services/authService";

class Register extends Component {
  state = {
    account: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: ""
    }
  };

  handleChange = e => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("ok");
    this.doSubmit();
  };

  doSubmit = async () => {
    const response = await register(this.state.account);
    loginWithJwt(response.headers["x-auth-token"]);
    window.location = "/";
  };

  validate = () => {
    if (this.state.account.password === this.state.account.confirmpassword) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <div className="container down form-register">
        <div className="container down">
          <div class="card">
            <div class="card-header">Register</div>
            <div class="card-body">
              <form className="" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="firstname">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstname"
                    placeholder="Enter First Name"
                    name="firstname"
                    value={this.state.account.firstname}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastname">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    placeholder="Enter Last Name"
                    name="lastname"
                    value={this.state.account.lastname}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    name="email"
                    value={this.state.account.email}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    name="password"
                    value={this.state.account.password}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmpassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmpassword"
                    placeholder="Confirm Password"
                    name="confirmpassword"
                    value={this.state.account.confirmpassword}
                    onChange={this.handleChange}
                  />
                </div>
                <button
                  disabled={!this.validate()}
                  type="submit"
                  className="btn btn-primary"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
