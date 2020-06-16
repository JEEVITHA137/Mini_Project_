import React,{Component} from 'react';
import './profile.css';
class Key extends Component{

 state = {
     key:""
 };

  componentDidMount(){
      this.getKey()
  }

  getKey = _ =>{
      fetch(`http://localhost:4000/api`)
      .then(response=>response.json())
      .then(response => {
            response.data.map( ({i,Email,APIKey}) => {
               if (this.props.email ===Email)
               {
                    this.setState({key:APIKey})
                    console.log(this.state.key)
               }
             })
        })
    }

  render(){
     return(
      <div className="bg">
      <div className="form">
         <label className="head">API-Key</label><br/>
         <label>Your api-key:</label><input type="text" value={this.state.key}/><br/><span></span><br/>
       </div></div>
     );
   }
}
export default Key;
