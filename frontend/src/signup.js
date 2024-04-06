import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
const Signup = (props) => {
  const {showAlert}=props;
//if(word==='danger'){
//word="error";



  let Navigate=useNavigate();
  const [state, setState] = useState({name:"", email: "", password: "" ,cpassword:""});
const formSubmit=async(e)=>{
e.preventDefault();
let success=false;
const {cpassword ,password}=state;;
const response = await fetch("http://localhost:5000/api/auth/create", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({name:state.name, email: state.email, password: state.password }),

});
if(password===cpassword){
  let json = await response.json();
  success=true;

  console.log(success, json);

  localStorage.setItem('AuthTOKEN',json.AUTHTOKEN)



Navigate('/');
showAlert("Create Account SuccessFUly",('success').charAt(0).toUpperCase()+('success').slice(1).toLowerCase());

}
 else {
  showAlert("Invalid Details.",('danger').charAt(0).toUpperCase()+('danger').slice(1).toLowerCase());
 
  
  
}





}






const onChange = (e) => {
  setState({ ...state, [e.target.name]: e.target.value });
};


  return (
    <div className='mt-3'>
    <h3 className="text-center text-danger">Create Account To Use To INoteBook..</h3>
 <form onSubmit={formSubmit}>
 <div className="mb-3">
        <label htmlFor="name" className="form-label"> Name</label>
       <input type="text" className="form-control" id="name" value={state.name}  name="name"
         aria-describedby="emailHelp"  onChange={onChange} required/>
      </div>
      <div className="mb-3">
     <label  htmlFor="exampleInputEmail1" className="form-label"> Email address</label>
          <input type="email" className="form-control" id="email"  name="email"
            aria-describedby="emailHelp" value={state.email} onChange={onChange} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label"> Password</label>
          <input type="password" className="form-control" id="password"
            name="password" value={state.password} onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label" minLength={5}>Comfirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" value={state.cpassword} onChange={onChange}/>
        </div>

        <button type="submit" className="btn btn-primary"> Submit</button>
      </form>
  
      
    </div>
  )
}

export default Signup

