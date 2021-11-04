import React, { useState } from "react";
import {toast} from 'react-hot-toast'
import {useHistory} from 'react-router-dom'
export const ContactUs = () => {
    const history=useHistory()
    const [email,setEmail]=useState('')
    const handleSubmit= (e)=>{
        e.preventDefault();
        toast.success(`We will contact you shortly ${email}`)
        history.push('/')
    }
  return (
    <form className="w-50 m-auto" onSubmit={handleSubmit}>
      <div class="form-group mt-5">
        <label for="exampleInputEmail1">Email address</label>
        <input
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
        />
        <small id="emailHelp" class="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      <button type="submit" class="btn btn-primary mt-4">
        Submit
      </button>
    </form>
  );
};
