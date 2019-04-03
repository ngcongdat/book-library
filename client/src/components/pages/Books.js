import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";
import axios from "axios";

export default class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
    this.changePages = this.changePages.bind(this);
  }

  async componentDidMount() {
    this.setState({
      books: await axios.get("/api/books/showbooks").then(res => res.data)
    });
  }

  async changePages(e) {
    this.setState({
      books: await axios
        .get(`/api/books/showbooks?page=${e.target.name}`)
        .then(res => res.data)
    });
  }

  render() {
    const { books } = this.state;

    return (
      <Container>
        <Row>
          {books.map(book => (
            <Col md="4" key={book._id}>
              <Card>
                <CardImg top width="100%" src={book.image} />
                <CardBody>
                  <CardTitle>{book.title}</CardTitle>
                  <CardText>{book.description}</CardText>
                  <Button>View Book</Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
        <Row>
          <Pagination aria-label="Page navigation example">
            <PaginationItem>
              <PaginationLink href="#!" onClick={this.changePages} name="1">
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#!" onClick={this.changePages} name="2">
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#!" onClick={this.changePages} name="3">
                3
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </Row>
      </Container>
    );
  }
}
