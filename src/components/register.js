import React, { Component } from "react";
import { Base64 } from 'js-base64';
import './login.css';

class register extends Component{
  state={
    curTime : new Date().toLocaleString(),
    name:"",
    nameError:"",
    email:"",
    emailError:"",
    pass:"",
    showData:"",
    PassError:"",
    dep:"",
    DepError:"",
    year:"",
    YearError:"",
    key:"",
    KeyError:"",
    alread:"",
    login:[]
  };

  componentDidMount(){
    this.getLogin()
  }

  getLogin = _ =>{
    fetch("http://localhost:4000/login")
    .then(response=>response.json())
    .then(response=>this.setState({login:response.data}))
    .catch(err=>console.log(err))
  }

  addUser = (pass,key) =>{
    fetch(`http://localhost:4000/register/add?email=${this.state.email}&name=${this.state.name}&pass=${pass}&roll= &department= &year= &hint= &api=${key}`)
    .then(response=>response.json())
    .then(this.getLogin)
    .catch(err=>console.error(err))
  }

  encryptPassword = () => {
  var encodePass = Base64.encode(this.state.pass);
  var encodeKey = Base64.encode(this.state.curTime);
  this.addUser(encodePass,encodeKey);
  }

  NameChange = (event) => {
    let alph=/^[a-zA-Z]+$/
    this.setState({
      name:event.target.value
    })
    if(this.state.name.length<4)
    {
      this.setState({
      NameError:"Username needs to be atleast 5 characters long"
      })
    }
    else if(!(alph.test(this.state.name))){
      this.setState({
      NameError:"Must be an alphabetics only"
      })
    }
    else{
      this.setState({
      NameError:""
      })
      }
    }

  EmailChange = (event) => {
    this.setState({
      email:event.target.value
    })
    if(this.state.email.length<5)
    {
      this.setState({
      emailError:"Email needs to be atleast 5 characters long"
      })
    }
    else {
      this.setState({
      emailError:""
      })
    }
  }

  PassChange = (event) => {
    let passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/
    this.setState({
      pass:event.target.value
    })
    if(!(passRegex.test(this.state.pass))){
      this.setState({
        PassError:" Atleast 8 letters have One alphanumerics"
      })
    }
    else {
      this.setState({
         PassError:""
      })
    }
  }

  submit = () => {
    let error = 0;
    if(this.state.name==="")
    {
      error=1;
      this.setState({
      NameError:"Must Enter Inputs"
      })
    }
    if(this.state.email==="")
    {
      error=1;
      this.setState({
      emailError:"Must Enter Inputs"
      })
    }
    if(this.state.pass==="")
    {
      error=1;
      this.setState({
      PassError:"Must Enter Inputs"
      })
    }
    if(error===0)
    {
      this.state.login.map(this.renderLogin = ({i,Name,Email,Pass}) => {
        if(this.state.email===Email)
        {
              error=2;
        }
      });
      if(error===2)
      {
        this.setState({
          already:"Already Exist"
        })
      }
      else if(this.state.NameError === "" && this.state.PassError === "" && this.state.emailError === ""){
        this.encryptPassword();
        console.log(this.state.curTime);
        this.props.start(this.state.name);
        this.props.getId(this.state.email);
        this.props.history.push('./');
      }
    }
  }

  render(){
     return(
      <div className="bg">
      <div className="form">
         <label className="head">Register</label><br/>
         <span>{this.state.already}</span><br/>
         <label>Name:</label><input type="text" value={this.state.name} onChange={this.NameChange}/><br/><span>{this.state.NameError}</span><br/>
         <label>E-mail:</label><input value={this.state.email} type="text" onChange={this.EmailChange}/><br/><span>{this.state.emailError}</span><br/>
         <label>Password:</label><input value={this.state.pass} type="password" onChange={this.PassChange}/><br/><span>{this.state.PassError}</span><br/>
         <button className="sum" onClick={this.submit} >Submit</button>
         <p>Already user?<a href="/login">Login</a></p>
       </div></div>
     );
   }
}
export default register;
