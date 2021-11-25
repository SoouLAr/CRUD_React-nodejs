import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";
import isEmail from "validator/lib/isEmail";
import "./modalStyle.css";

export const ModalLoginSignUp = ({
  closeModal,
  modalisOpen,
  setModalConfirmCode,
  openLogin
}) => {
  Modal.setAppElement("#root");
  const [isSigninUp, setIsSigninUp] = useState(true);
  const [code, setCode] = useState(undefined);

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: false,
    username: false,
    passwordOneCapitalLetter: false,
    passwordOnenumber: false,
    passwordLonger: false,
  });
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
      height: "auto",
    },
  };

  const passwordHandle = (password) => {
    setErrors({
      ...errors,
      passwordOneCapitalLetter: !/[A-Z]/.test(password),
      passwordLonger: password.length < 8,
      passwordOnenumber: !/[1-90]/.test(password),
    });
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    e.target.name === "email" &&
      setErrors({ ...errors, email: !isEmail(e.target.value) });
    e.target.name === "username" &&
      setErrors({ ...errors, username: e.target.value.length < 3 });
    if (e.target.name === "password") passwordHandle(e.target.value);
  };

  const signUp = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get(
        `https://vncxnflmg5.execute-api.eu-south-1.amazonaws.com/dev/getToken?username=${newUser.username}&email=${newUser.email}&password=${newUser.password}`,
        { headers: { "Access-Control-Allow-Origin": "*" } }
      );
      if (response.status === 201) {
        setIsSigninUp(false)
      }
    } catch (error) {
      toast.error("Username is taken");
    }
  };

  const approveCode = async ()=>{
    try {
      const response = await axios.get(`https://eyrwkgdhtd.execute-api.eu-south-1.amazonaws.com/dev/confirmCode?username=${newUser.username}&code=${code}`)
    if(response.status===201){
      toast.success("Verified.Now login!")
      closeModal()
    }else{
      toast.error('Wrong code, try again!')
    }
    } catch (error) {
      toast.error("Try again!")
    }
  }

  const sendCode = async()=>{
    try {
      const response = await axios.get(`https://rkhd6s5iwj.execute-api.eu-south-1.amazonaws.com/dev/resendConfirmCode?username=${newUser.username}`)
      console.log(response);
      if(response.status===200) toast.success('Check your email')
      setIsSigninUp(true)
    } catch (error) {
      toast.error('Try again')
    }
  }

  return (
    <Modal
      isOpen={modalisOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      {isSigninUp ? (
        <div classNameName="signup">
          <div class="float-left">
            <button
              type="button"
              class="btn btn-outline-dark"
              onClick={() => {
                closeModal(false);
                openLogin(true)
              }}
            >
              Back
            </button>
          </div>
          <form className="w-50 m-auto">
            <div className="form-group mt-2">
              <label for="exampleInputEmail1">E-mail</label>{" "}
              {errors.email && (
                <p className="d-inline text-danger ml-3">
                  E-mail must be a valid one
                </p>
              )}
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
              <label for="exampleInputEmail1">Username</label>{" "}
              {errors.username && (
                <p className="d-inline text-danger ml-3">Longer username</p>
              )}
              <input
                type="text"
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
              {errors.passwordOnenumber && (
                <p className="text-danger warningPassword">
                  Password must contain a number
                </p>
              )}
              {errors.passwordOneCapitalLetter && (
                <p className="text-danger warningPassword">
                  Password must contain a capital letter
                </p>
              )}
              {errors.passwordLonger && (
                <p className="text-danger warningPassword">
                  Password should be at least 8 character
                </p>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-outline-primary mt-2"
              onClick={signUp}
            >
              Sign Up
            </button>
          </form>
        </div>
      ) : (
        <div className="">
          <p>Please check you email we sent you a verification code there!</p>
          <label for="exampleInputEmail1">Code</label>
          <div className="w-100">
            <input
              value={code}
              type="text"
              class="form-control w-50 d-inline"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter code"
              onChange={(e) => setCode(e.target.value)}
            />
            <button className="btn btn-success d-inline ml-4" onClick={approveCode}>Approve</button>
          </div>
          <p className="mt-3 mb-1">Didn't get any code?</p>
          <button className="btn btn-outline-primary btn-sm w-25" onClick={sendCode}>
            Send again
          </button>
        </div>
      )}
    </Modal>
  );
};
