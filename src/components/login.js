import React,{Component} from 'react';
import { Base64 } from 'js-base64';
import './login.css';

class Login extends Component{
  state={
    namel:"",
    NamelError:"",
    passl:"",
    PasslError:"",
    invalid:"",
    login:[],
    name:"",
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

  decryptPassword = (e) => {
    var decode = Base64.decode(e);
    return decode;
  }

  NamelChange = (event) => {
    this.setState({
      namel:event.target.value
    })
  }

  PasslChange = (event) => {
    this.setState({
      passl:event.target.value
    })
  }

  submit = ()=> {
    let error = 0;
    let name="";
    if(this.state.namel==="")
    {
      error=1;
      this.setState({
      NamelError:"Must Enter Inputs"
      })
    }
    if(this.state.passl==="")
    {
      error=1;
      this.setState({
      PasslError:"Must Enter Inputs"
      })
    }
    if(error===0)
    {
      this.state.login.map(this.renderLogin = ({i,Name,Email,Pass}) => {
          if(this.state.namel===Email)
          {
              var decodePassword = this.decryptPassword(Pass);
              if(this.state.passl === decodePassword)
              {
                error=2;
                name=Name;
              }
          }
        });
      if(error===2)
      {
        this.props.start(name);
        this.props.getId(this.state.namel);
        this.props.history.push('./');
      }
      else {
        this.setState({
          invalid:"Invalid Credetials"
        })
      }
    }
  }

  render(){
     return(
       <div className="bg">
       <div className="form">
         <label className="head">Login</label><br/>
         <span>{this.state.invalid}</span><br/>
         <label>E-mail:</label><input type="text" value={this.state.namel} onChange={this.NamelChange}/><br/><span>{this.state.NamelError}</span><br/>
         <label>Password:</label><input type="password" value={this.state.passl} onChange={this.PasslChange}/><br/><span>{this.state.PasslError}</span><br/>
         <button className="sum"  onClick={this.submit}> Submit</button><br/>
         <p>New User?<a href="/register">Register</a></p>
       </div></div>
     );
   }
}
export default Login;
