import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import classNames from "classnames";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post("/api/users/register", newUser)
      .then(res => console.log(res.config.data))
      .catch(err =>
        this.setState({
          errors: err.response.data
        })
      );
  }
  render() {
    const { errors } = this.state;
    return (
      <div>
        <h1>Register</h1>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              className={classNames({ "is-invalid": errors.name })}
              type="text"
              name="name"
              id="name"
              value={this.state.name}
              onChange={this.onChange}
              placeholder="Your Name"
            />
            {errors.name && <div class="invalid-feedback">{errors.name}</div>}
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              className={classNames({ "is-invalid": errors.email })}
              type="email"
              name="email"
              id="email"
              value={this.state.email}
              onChange={this.onChange}
              placeholder="Your Email"
            />
            {errors.email && <div class="invalid-feedback">{errors.email}</div>}
            <p>Your avatar will be got same email gravatar</p>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              className={classNames({ "is-invalid": errors.password })}
              type="password"
              name="password"
              id="password"
              value={this.state.password}
              onChange={this.onChange}
              placeholder="Your Password"
            />
            {errors.password && (
              <div class="invalid-feedback">{errors.password}</div>
            )}
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}
