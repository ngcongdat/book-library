import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import axios from "axios";
import classNames from "classnames";
import { Redirect } from "react-router";

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
      .then(res => {
        console.log(res.config.data);
        sessionStorage.setItem("register", "successRegister");
        this.setState(state => {
          return {
            state: state
          };
        });
      })
      .catch(err =>
        this.setState({
          errors: err.response.data
        })
      );
  }
  render() {
    const { errors } = this.state;
    if (sessionStorage.getItem("register") === "successRegister") {
      sessionStorage.removeItem("login");
      sessionStorage.removeItem("register");
      return <Redirect to="/login" />;
    }
    return (
      <Container className="pt-4 pb-4">
        <Row>
          <Col
            xs="12"
            sm="12"
            md="12"
            lg="12"
            className="pt-4 d-flex justify-content-center"
          >
            <div className="col-sm-12 col-sm-12 col-md-6 col-lg-6">
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
                  {errors.name && (
                    <div class="invalid-feedback">{errors.name}</div>
                  )}
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
                  {errors.email && (
                    <div class="invalid-feedback">{errors.email}</div>
                  )}
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
          </Col>
        </Row>
      </Container>
    );
  }
}
