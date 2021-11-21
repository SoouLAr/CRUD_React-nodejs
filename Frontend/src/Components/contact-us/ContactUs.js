import React, { useState } from "react";
import axios from "axios";
import {toast} from 'react-hot-toast'
import {useHistory} from 'react-router-dom'

export const ContactUs = () => {
    const history=useHistory()
    const [credencials,setCredencials]=useState({
      email:'',
      message:''
    })

    const handleChange = e=>{
      setCredencials({...credencials,[e.target.name]:e.target.value})
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
          console.log(credencials);
          const response = await axios.post(`https://tal7fy956f.execute-api.eu-south-1.amazonaws.com/dev/messageUpload/${credencials.email}/${credencials.message}`,{})
          console.log(response);
          toast.success(`We will contact you shortly ${credencials.email}`)
        history.push('/') 
    }
  return (
    <form className="w-50 m-auto" onSubmit={handleSubmit}>
      <div class="form-group mt-5">
        <label for="exampleInputEmail1">Email address</label>
        <input
            value={credencials.email}
            onChange={handleChange}
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
        />
        <small id="emailHelp" class="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <textarea onChange={handleChange} name='message' value={credencials.message} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      <button type="submit" class="btn btn-primary mt-4">
        Submit
      </button>
    </form>
  );
};
