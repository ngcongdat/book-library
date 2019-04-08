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
  Pagination,
  PaginationItem,
  PaginationLink,Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";
import axios from "axios";

export default class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      page: 1,
      perPage: 9,
      logged: {},
      dropdownOpen: false
    };
    this.changePages = this.changePages.bind(this);
    this.readBook = this.readBook.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  async componentDidMount() {
    const jwt = localStorage.getItem('jwt');
    if(!jwt) {
      this.props.history.push('/login');
    }
    else{
      this.setState({
        books: await axios.get("/api/books/showbooks").then(res => res.data),
      });
    }
  }

  async changePages(e) {
    this.setState({
      page: parseInt(e.target.name),
      books: await axios
        .get(`/api/books/showbooks?page=${e.target.name}`)
        .then(res => res.data)
    });
  }

  async readBook(e) {
    const { page, perPage } = this.state;
    const start = (page - 1) * perPage;
    const end = page * perPage;
    this.setState({
      books: await axios
        .get(`/api/books/book?b=${e.target.name}`)
        .then(res =>
          res.data.sort((a, b) => b.readTime - a.readTime).slice(start, end)
        )
    });
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    const { books } = this.state;
    // if (logged.login === false) {
    //   return <Redirect to="/login" />;
    // }

    return (
      <Container className="pt-4 pb-4">
      <Row>
        <Col>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            Dropdown
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Logout</DropdownItem>
            <DropdownItem>Some Action</DropdownItem>
            <DropdownItem disabled>Action (disabled)</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Foo Action</DropdownItem>
            <DropdownItem>Bar Action</DropdownItem>
            <DropdownItem>Quo Action</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Col>
      </Row>
        <Row>
          <Col className="text-center pb-4">
            <h1>Book Library</h1>
          </Col>
        </Row>
        <Row>
          {books.map(book => (
            <Col xs="12" sm="12" md="4" lg="4" key={book._id}>
              <Card className="mt-2 mb-2">
                <CardImg top width="100%" src={book.image} />
                <CardBody>
                  <CardTitle className="font-weight-bold">
                    {book.title}
                  </CardTitle>
                  <CardText>{book.description}</CardText>
                  <CardText className="font-weight-bold">
                    Readed: {book.readTime}
                  </CardText>
                  <a
                    className="viewBooks"
                    href="#!"
                    onClick={this.readBook}
                    name={book._id}
                  >
                    Read Book
                  </a>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
        <Row>
          <Col
            xs="12"
            sm="12"
            md="12"
            lg="12"
            className="pt-4 d-flex justify-content-center"
          >
            <Pagination aria-label="Page navigation example">
              <PaginationItem>
                <PaginationLink href="#1" onClick={this.changePages} name="1">
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#2" onClick={this.changePages} name="2">
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#3" onClick={this.changePages} name="3">
                  3
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </Col>
        </Row>
      </Container>
    );
  }
}
