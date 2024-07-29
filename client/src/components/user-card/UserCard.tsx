import React from 'react';
import { User } from '../../utils/interfaces';
import classes from './style.module.css';

const UserCard: React.FC<User> = ({ name, surname, height, weight, sex, address, image}) => {
  return (
    <div className={classes.card}>
      <p>Name: {name}</p>
      <p>Surname: {surname}</p>
      <p>Height: {height}</p>
      <p>Weight: {weight}</p>
      <p>Sex: {sex}</p>
      <p>Address: {address}</p>
      <p>Image: {image}</p>
    </div>
  );
};

export default UserCard;
