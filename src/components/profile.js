import React,{Component} from 'react';
import './profile.css';

class Profile extends Component{

  state={
    Name:"je",
    Mail:"",
    RollNo:"",
    Department:"",
    Year:"",
    Key:"",
    profile:[],
  };

  componentDidMount(){
    this.getProfile()
  }

  getProfile = _ =>{
    fetch(`http://localhost:4000/select`)
    .then(response=>response.json())
    .then(response => {
          response.data.map( ({i,Email,Name,RollNo,Department,Year,Hint}) => {
             if (this.props.email ===Email)
             {
                  this.setState({
                        Name: Name,
                        Mail: Email,
                        RollNo: RollNo,
                        Department: Department,
                        Year: Year,
                        Key: Hint,
                  })
             }
           })
      })
    .catch(err=>console.log(err))
  }

  UpdateProfile = () =>{
    console.log("hi");
    fetch(`http://localhost:4000/profile?rollno='${this.state.RollNo}'`)
    .then(response=>response.json())
    .then(this.getLogin)
    .catch(err=>console.error(err))
  }

  RollNoChange = (event) => {

    this.setState({
      RollNo:event.target.value
    })
  }

  render(){
     return(
      <div className="bg" onLoad={this.getValues}>
      <div className="form">
         <label className="head">User - Profile</label><br/>
         <label>Name:</label><input type="text" value={this.state.Name}/><br/><span></span><br/>
         <label>Mail:</label><input type="text" value={this.state.Mail}/><br/><span></span><br/>
         <label>Roll.No:</label><input type="text" value={this.state.RollNo} onChange={this.RollNoChange}/><br/><span></span><br/>
         <label>Department:</label><input type="text" value={this.state.Department}/><br/><span></span><br/>
         <label>Year:</label><input type="text" value={this.state.Year}/><br/><span></span><br/>
         <label>Key:</label><input type="text" value={this.state.Key}/><br/><span></span><br/>
         <button className="sum" onClick={this.UpdateProfile}>Update</button>
       </div></div>
     );
   }
}
export default Profile;
