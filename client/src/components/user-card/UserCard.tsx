import React from 'react';
import { User } from '../../utils/interfaces';
import classes from './style.module.css';
import { Button } from '@mui/material';
import { CHANGE_USER_INFO_ROUTE } from '../../constants/user-routes';
import { Link } from 'react-router-dom';
import { serverURL } from '../../constants/constants';

const UserCard: React.FC<User> = ({
  id,
  name,
  surname,
  height,
  weight,
  sex,
  address,
  image,
  deleteFunction
}) => {
  return (
    <div className={classes.card}>
      <div className={classes.cardInfo}>
        <img
          className={classes.avatar}
          src={`${serverURL}${image}`}
          alt="name"
        />
        <div>
          <p>Name: {name}</p>
          <p>Surname: {surname}</p>
          <p>Height: {height}</p>
          <p>Weight: {weight}</p>
          <p>Sex: {sex}</p>
          <p>Address: {address}</p>
        </div>
      </div>
      <Link to={CHANGE_USER_INFO_ROUTE + `/${id}`}>
        <Button variant="outlined" color="warning" className={classes.button}>
          Change info
        </Button>
      </Link>
      <Button variant="outlined" color="error" onClick={deleteFunction}>
        Delete
      </Button>
    </div>
  );
};

export default UserCard;
