import React, { useRef, useState } from "react";
import axios from "axios";
import './Registr.scss';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
export const Register: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>();
  const statusText = useRef<HTMLParagraphElement | null>(null);
  async function handleSubmit(e: any) {
    e.preventDefault();
    const { username, password, email, fullname } = e.target.elements;
    console.log(username.value, password.value, email.value, fullname.value);
    const response = await axios.post("http://localhost:7000/new-user", {
      username: username.value,
      password: password.value,
      email: email.value,
      fullName: fullname.value?fullname.value:'',
    });
    console.log(response);
    if (response.data.status === 200) {
      setStatus("Successfully registered");
      statusText.current?.classList.add("login__status--success");
      setTimeout(() => {
        statusText.current?.classList.remove("login__status--success");
        navigate(`/admin/${response.data.token}`);
      }, 2000);
    } else {
      setStatus("This username is taken, please try again");
      statusText.current?.classList.add("login__status--error");
      setTimeout(() => {
        statusText.current?.classList.remove("login__status--error");
      }, 5000);
    }
  }
  return (
    <div className="login">
      <div className="login__wrapper  container-md">
        <h2 className="login__title register__ h1">Sign up</h2>
        <p className="login__text">Sign up and start managing users!</p>
        <form className="login__form" onSubmit={handleSubmit}>
          <label htmlFor="fullname" className="register__label">
            Full name 
          </label>
          <input
            type="text"
            id="fullname"
            className="login__input register__input"
            name="fullname"
            placeholder="Full name"
          />
          <label htmlFor="username" className="register__label">
            Username <span className="register__star">*</span>
          </label>
          <input
            type="text"
            id="username"
            className="login__input register__input"
            name="username"
            placeholder="Username"
            required
            minLength={1}
          />

          <label htmlFor="email" className="register__label">
            Email <span className="register__star">*</span>
          </label>
          <input
            type="email"
            id="email"
            className="login__input register__input"
            name="email"
            placeholder="Email"
            required
            minLength={1}
          />
          <label htmlFor="password" className="register__label">
            Password <span className="register__star">*</span>
          </label>
          <input
            type="password"
            id="password"
            className="login__input"
            name="password"
            placeholder="Password"
            required
            minLength={1}
          />
          <p className="login__status" ref={statusText}>
            {status}
          </p>
          <input type="submit" placeholder="Submit" className="login__submit" />
          <div className="login__link--wrapper">
            <p className="login__link">Do you have an account? </p>
            <Link className="register__link" to="/">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
