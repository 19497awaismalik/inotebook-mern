import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const {showAlert}=props;
 let Navigate=useNavigate();
  const [state, setState] = useState({ email: "", password: "" });
  const formSubmit = async (e) => {
    
    e.preventDefault();
    let success = true;
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: state.email, password: state.password }),
    });
    const json = await response.json();
    console.log(success, json);
    if(json.success){
localStorage.setItem('AuthTOKEN',json.AUTHTOKEN)
Navigate('/');
showAlert("login in Success",('success').charAt(0).toUpperCase()+('success').slice(1).toLowerCase());
    }
    else{


      
showAlert('Invalid Email and Password',('danger').charAt(0).toUpperCase()+('danger').slice(1).toLowerCase());
    }
    

      
  };
  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div className="mt-3">
    <h3 className="text-center text-danger">Login To Continue To INoteBook..</h3>
      <form onSubmit={formSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label"> Email address</label>
          <input type="email" className="form-control" id="email" value={state.email} onChange={onChange} name="email"
            aria-describedby="emailHelp" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label"> Password</label>
          <input type="password" className="form-control" id="password" value={state.password} onChange={onChange}
            name="password" required/>
        </div>

        <button type="submit" className="btn btn-primary"> Submit</button>
      </form>
    </div>
  );
};

export default Login;
