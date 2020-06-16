import React,{Component} from 'react';
import '../App.css';
import Login from './login.js';
import Home from './home.js';
import Register from './register.js';
import Profile from './profile.js';
import Key from './key.js';
import Widget from './Widget.js';
import {BrowserRouter,Route,Link} from 'react-router-dom';
class Header extends Component{
  state={
    logged:[
      {
        name:"Login",
        link:"/login"
      }
    ],
    email:"",

  };

 start = (e) =>
 {
   if(e!=="")
   {
    this.setState({
      logged:[
        {
          name:e,
          class:"dropdown-content",
          profile:"Profile",
          profilelink:"/profile",
          logout:"Logout",
          Key:"API-Key"
        },
        {
          name:"Widgets",
          link:"/widget",
          class:"dis"
        },
        {
          name:"Device",
          link:"/register",
          class:"dis"
        },
        {
          name:"Dashboard",
          link:"/register",
          class:"dis"
        }
      ]
    })
  }
 }

getId = (e) => {
  this.setState({email:e})
}

  view = () => {
    return this.state.logged.map((logged,i) =>
    <div className="dropdown">
      <li key={i} ><Link to={logged.link} className="list dropdown">{logged.name}</Link></li>
       {this.menudrop(logged.class)}
      </div>
    );
  }

  menudrop = (e) => {
    if(e==="dropdown-content")
    {
        return(
        <div class="dropdown-content">
        <Link to="/profile">Profile</Link><br/>
        <Link to="/key">API Key</Link><br/>
        <a href="/">Logout</a><br/></div>
        );
   }
  }

  render(){
  return (
    <html>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    <header className="App-header">
          <nav>
          <BrowserRouter>
          <label className="title"><Link to="/"  style={{color:"white"}}>ITIOT Cloud</Link></label>
            <ul >
            {this.view()}
            </ul>
            <Route exact path="/login" render={(props) => <Login {...props} start={this.start} getId={this.getId} email={this.state.email} />}/>
            <Route exact path="/" component={Home}/>
            <Route exact path="/register" render={(props)=><Register {...props}  start={this.start}  getId={this.getId} email={this.state.email}/>}/>
            <Route exact path="/profile" render={(props)=><Profile {...props} email={this.state.email}/>}/>
            <Route exact path="/key" component={Key}/>
            <Route exact path="/widget" component={Widget}/>
            </BrowserRouter>
          </nav>
      </header>
      </html>
  );
}
}

export default Header;
