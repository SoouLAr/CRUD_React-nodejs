import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";
import isEmail from 'validator/lib/isEmail';

import "./modalStyle.css";


export const ModalLoginSignUp = ({ closeModal, modalisOpen }) => {
  Modal.setAppElement("#root");
  const [isLoginIn, setIsLogin] = useState(true);
  const [user,setUser]=useState({
      username: "",
      password: ""
  })
  const [newUser,setNewUser]=useState({
      username: "",
      email: "",
      password: "",
      repeatPassword: ""
  })
  const [errors,setErrors]=useState({
      email: false,
      username: false,
      samePassword: false,
      passwordOneCapitalLetter: true,
      passwordOnenumber: true,
      passwordLonger: true
  })
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      display: "flex",
      flexDirection: "column",
      padding: "20px 50px",
      backgroundColor: "white",
      borderRadius: 10,
      position: "relative",
      width: "35vw",
      height: isLoginIn? "35vh" : "50vh"
    },
  };

  const handleChange = (e)=>{
      if(isLoginIn){
        setUser({...user,[e.target.name]:e.target.value}) 
      }
      else{
        setNewUser({...newUser,[e.target.name]:e.target.value})
        console.log(newUser);
        e.target.name==="repeatPassword" && setErrors({...errors,samePassword: newUser.password!=newUser.repeatPassword})
        e.target.name==="email" && setErrors({...errors,email:!isEmail(e.target.value)})
        e.target.name==="username" && setErrors({...errors,username:e.target.value.length<3})
      }
  }
  
  const login = async (e)=>{
      e.preventDefault();
      try {
          const response = await axios.get(`https://mpghr64d46.execute-api.eu-south-1.amazonaws.com/dev/login?username=${user.username}&password=${user.password}`)
          localStorage.setItem('accesToken',response.data.message.accessToken)
          localStorage.setItem('idToken',response.data.message.idToken)
          localStorage.setItem('refreshToken',response.data.message.refreshToken)
          response.status===201 && closeModal();
                  
      } catch (error) {
          toast.error("Wrong password try again")
      } 
  }


  return (
    <Modal
      isOpen={modalisOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      {isLoginIn ? (
        <div classNameName="login s">
          <form className="w-50 m-auto" onSubmit={login}>
            <div className="form-group ">
              <label for="exampleInputEmail1">Username</label>
              <input
                value={user.username}
                name="username"
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Username"
                onChange={handleChange}
              />
            </div>
            <div className="form-group ">
              <label for="exampleInputPassword1">Password</label> {user.password.length<8 && <p className="d-inline ml-3 text-danger">Password too short</p>}
              <input
                value={user.password}
                name="password"
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary mt-2">
              Log In
            </button>
            <hr class="mt-3 mb-3"/>
            <p className="d-inline">Create account here</p><button type="button" class="btn btn-light btn-sm ml-2" onClick={()=>{setIsLogin(false)}}>Create</button>
            </form>
        </div>
      ) : (
        <div classNameName="signup">
            <div class="float-left"><button type="button" class="btn btn-outline-dark" onClick={()=>{setIsLogin(true)}}>Back</button></div>
             <form className="w-50 m-auto">
             <div className="form-group mt-2">
              <label for="exampleInputEmail1">E-mail</label> {errors.email && <p className="d-inline text-danger ml-3">E-mail must be a valid one</p>}
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="E-mail"
                name="email"
                value={newUser.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-2">
              <label for="exampleInputEmail1">Username</label> {errors.username && <p className="d-inline text-danger ml-3">Longer username</p> }
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Username"
                name="username"
                value={newUser.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-2">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                name="password"
                value={newUser.password}
                onChange={handleChange}
              />
              {}
              {}
              {}
            </div>
            <div className="form-group mt-2">
              <label for="exampleInputPassword1">Repeat password</label> {errors.samePassword && <p className="d-inline text-danger float">Password must match</p> }
              <input
                name="repeatPassword"
                value={newUser.repeatPassword}
                onChange={handleChange}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Repeat password"
              />
            </div>
            <button type="submit" className="btn btn-outline-primary mt-2">
              Sign Up
            </button>
            </form>
        </div>
      )}
    </Modal>
  );
};
