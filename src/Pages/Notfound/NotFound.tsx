import { FC } from 'react';
import './Notfound.scss';
import { Link } from 'react-router-dom';
export const Notfound:FC = () => {
    return (
      <>
        <h2 className="notfound__title">Not Found :(</h2>
        <Link className="btn notfound__btn btn-success btn-lg" to="/">
          Back to Login
        </Link>
      </>
    );   
}