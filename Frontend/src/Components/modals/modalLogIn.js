import React,{useState} from "react";
import Modal from "react-modal";
import axios from "axios";
import toast from "react-hot-toast";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    padding: "20px 50px",
    backgroundColor: "white",
    borderRadius: 10,
  },
};
export const ModalLogIn = ({ modalIsOpen,closeModal,setLoginSignUp}) => {
  Modal.setAppElement("#root");
  const [user,setUser]=useState({
    username: "",
    password: ""
})
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
const handleChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value}) 
}

  return (
    <Modal
      isOpen={modalIsOpen}
      style={customStyles}
    >          
          <form className="w-100 m-auto" onSubmit={login}>
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
              <label for="exampleInputPassword1">Password</label> {user.password.length<8 && <p className="d-inline  text-danger">Password too short</p>}
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
            <p className="d-inline">Create account here</p><button type="button" class="btn btn-light btn-sm ml-2" onClick={()=>{closeModal(); setLoginSignUp(true)}}>Create</button>
            </form>
            <div className=" w-100 mt-3">
            <button
              type="button"
              class="btn btn-outline-danger btn-sm float-right"
              onClick={() => {
                closeModal(false);
              }}
            >
              Exit
            </button>
            </div>
    </Modal>
  );
};

