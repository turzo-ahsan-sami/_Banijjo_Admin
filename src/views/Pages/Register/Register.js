import React, { Component } from 'react';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../../assets/img/brand/logo_head_left.png'
import  { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
const base = process.env.REACT_APP_ADMIN_SERVER_URL;

const Login = React.lazy(() => import('../Login'));

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      inputValue: '',
      userFound:'',
      message: '',
      checkStatus: false,
      isNameAllowed: true
    };

    this.handleProductChange = this.handleProductChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchEmail = this.searchEmail.bind(this);
    // console.log(this.state);
  }

  componentDidMount () {
    const userName = localStorage.getItem('userName');
    const userPassword = localStorage.getItem('userPassword');
    // if(userName=== null && userPassword === null)
    // {
    //   this.props.history.push("/login");
    // }
    // else {
    //   this.props.history.push("/dashboard");
    // }
  }

  searchEmail (event) {
      console.log(event.target.value);

      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value))
      {
          fetch(base+`/api/check-email?email=${event.target.value}` , {
            method: "GET"
          })

          .then((result) => result.json())
          .then((info) => {

            if (info.success == true) {
                console.log(info);
                this.setState({
                    message: 'Not Available',
                    checkStatus: false
                })
            }
            else {
                this.setState({
                    message: 'Available',
                    checkStatus: true
                })
              console.log(info);
            }

          });
      }
      else {
          this.setState({
              message: 'Invalied!',
              checkStatus: false
          })
      }

  }

  handleProductChange(event) {
    // this.setState({value: event.target.value});
    // alert(event.target.input.files[0]);
    let target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value,
      isNameAllowed: true
    });

    // let charecterForName = /^[A-Za-z]+$/;
    // let isItAllowed = false;

    // if (target.name == 'name') {
      
    //   isItAllowed = target.value.match(charecterForName);

    //   if (isItAllowed) {
    //     this.setState({
    //       [name]: value,
    //       isNameAllowed: true
    //     });
    //   }
    //   else {
    //     // console.log('Alphabet only and result : '+ isItAllowed +' - user inputed : '+target.value);
    //     this.setState({
    //       isNameAllowed: false
    //     })
    //   }
    // }

    // this.setState({
    //   [name]: value,
    // });

  }



  handleUsernameChange(event){
    this.setState({
      inputValue: event.target.value
    },()=>{
      let charecter = /^[A-Za-z]+$/;
      let isItAllowed = this.state.inputValue.match(charecter);

      if (isItAllowed) {
        fetch(base+'/api/checkUsername', {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(this.state)
        })
        .then((result) => result.json())
        .then((info) => {
          if(info.message){
            this.setState({userFound:'yes'});
          }
          else{
            this.setState({userFound:'no'});
          }
        })
      }
      else {
        console.log('Only alphabets are allowed');
      }

    });
  }




  handleSubmit (event) {
    event.preventDefault();

    console.log('submitted JSON value : ', JSON.stringify(this.state));
    console.log('submitted value : ', this.state);

    if (this.state.checkStatus == true) {
        fetch(base+'/api/vendor-registration' , {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(this.state)
          // body: this.state
        })
        .then((result) => result.json())
        .then((info) => {
          if (info.success == true) {
            ToastsStore.success("User  Successfully Registered !!");
            console.log('Success : ', info.success);

            setTimeout(
              function() {
                this.props.history.push("/");
              }
              .bind(this),
              3000
            );
          }
          else {
            ToastsStore.warning("User Registration Faild. Please try again !!");
            console.log(info.success);
          }

        })
    }
    else {
        this.setState({
            message: 'required*'
        })
    }

  }

  render() {
    // let status = this.state.userFound;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
          <ToastsContainer store={ToastsStore}/>
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form action="" method="post" encType="multipart/form-data" className="form-horizontal" onSubmit={this.handleSubmit}  onChange={this.handleProductChange}>

                    <Row>
                        <Col xs="12" className="text-center">
                            {/* <img src={logo} alt="banijjo" width="160" height="100" /> */}
                            <AppNavbarBrand full={{ src: logo, width: 160, height: 100, alt: 'CoreUI Logo' }}  href="https://banijjo.com.bd" target="_blank" rel="noopener noreferrer"/>
                            {/* <a href="https://banijjo.com.bd" target="_blank" rel="noopener noreferrer"></a> */}
                        </Col>
                    </Row>

                    <Row>
                      <Col xs="6">
                        <h1>Register</h1>
                        <p className="text-muted">Create your account</p>
                      </Col>

                      <Col xs="6" className="text-right">
                      <Link to="/login">
                        <Button color="success" style={{backgroundColor: "#009345"}}>Back To Login</Button>
                      </Link>
                      </Col>
                    </Row>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" name="name" required="true" placeholder="Name*" autoComplete="name" />
                      {
                        this.state.isNameAllowed == true ?
                        null
                        :
                        <p>Only alphabet is allowed</p>
                      }
                      
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>


                      <Input type="text" className={this.state.userFound=="yes"? "is-valid form-control":this.state.userFound=="no"? "is-invalid form-control":''} value={this.state.inputValue} name="userName" onChange={this.handleUsernameChange.bind(this)} required="true" placeholder="User Name*" autoComplete="username" />
                        <React.Fragment>
                              {
                                  this.state.userFound=="yes" ?
                                  <div style={{marginLeft:"10%",fontSize:"15px"}} className="valid-feedback">Username Available</div>
                                  : this.state.userFound=="no" ?
                                  <div style={{marginLeft:"10%",fontSize:"15px"}} className="invalid-feedback">Username Unvailable</div>
                                  :''
                                }
                        </React.Fragment>
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" name="userEmail" required="true" placeholder="Email*" autoComplete="email" onChange={this.searchEmail.bind(this)} />
                      {
                          this.state.checkStatus == true ?
                          <p style={{color: 'green'}}>{this.state.message}</p>
                          :
                          <p style={{color: 'red'}}>{this.state.message}</p>
                      }
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" name="userPassword" required="true" placeholder="Password*" autoComplete="new-password" />
                    </InputGroup>

                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" name="userRePassword" required="true" placeholder="Confirm password*" autoComplete="new-password" />
                    </InputGroup>

                    <Button type="submit" style={{backgroundColor: "#009345"}} color="success" block>Create Account</Button>
                  </Form>
                </CardBody>

              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
