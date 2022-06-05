import React, { useRef, useState } from "react";
import './Login.scss';
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { setStatusFunc } from "../../Helpers/setStatus";
import { Istatus } from "../../Helpers/interfaces";
export const Login: React.FunctionComponent = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState<string>()
  const statusText = useRef<HTMLParagraphElement| null>(null)
 async function handleSubmit(e:any) {
    e.preventDefault();
    const { username, password } = e.target.elements;
    const response = await axios.post("https://regauth1.herokuapp.com/login", {
     username: username.value, 
     password:password.value
   });
   const statusValue:Istatus = setStatusFunc(response.data.status)


  
     setStatus(statusValue.massage)
     statusText.current?.classList.add(statusValue.className);
     setTimeout(() => {
       statusText.current?.classList.remove(statusValue.className);
      }, statusValue.time);
   if (response.data.status === 200) setTimeout(() => {
      navigate(`/admin/${response.data.token}`);
   }, 2000);

   
  }
    return (
      <div className="login">
        <div className="login__wrapper  container-md">
          <h2 className="login__title h1">Sign in</h2>
          <p className="login__text">Sign in and start managing users!</p>
          <form className="login__form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="login__input"
              name="username"
              placeholder="Username"
              required
              minLength={1}
            />
            <input
              type="password"
              className="login__input"
              name="password"
              placeholder="Password"
              required
              minLength={1}
            />
            <p className="login__status" ref={statusText}>{ status}</p>
            <input
              type="submit"
              placeholder="Submit"
              className="login__submit"
            />
            <div className="login__link--wrapper">
              <p className="login__link">Don't you have an account? </p>
              <Link to="/registration">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    );
}