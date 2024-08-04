import React, { useCallback, useEffect, useState } from 'react';
import { UserService } from '../../services/user.service';
import { Button, MenuItem, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectAllUsers } from '../../store/user/user-slice';
import { User } from '../../utils/interfaces';
import classes from './style.module.css';
import { serverURL, sexValues } from '../../constants/constants';

const ChangeUserInfo: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [sex, setSex] = useState(sexValues[0].value);
  const [address, setAddress] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const userId = useParams();
  const navigate = useNavigate();
  const allUsers = useAppSelector(selectAllUsers);

  useEffect(() => {
    const currentUser = allUsers.users.find(
      (elem) => elem.id === Number(userId.id),
    );
    if (currentUser) {
      setCurrentUser(currentUser);
      setName(currentUser.name);
      setSurname(currentUser.surname);
      setHeight(currentUser.height);
      setWeight(currentUser.weight);
      setSex(currentUser.sex);
      setAddress(currentUser.address);
      setImagePreview(`${serverURL}${currentUser.image}`);
    }
  }, [allUsers, userId]);

  const changeUserInfo = useCallback(() => {
    const formData = new FormData();
    if (currentUser && name !== currentUser.name) formData.append('name', name);
    if (currentUser && surname !== currentUser.surname)
      formData.append('surname', surname);
    if (currentUser && height !== currentUser.height)
      formData.append('height', `${height}`);
    if (currentUser && weight !== currentUser.weight)
      formData.append('weight', `${weight}`);
    if (currentUser && sex !== currentUser.sex)
      formData.append('sex', `${sex}`);
    if (currentUser && address !== currentUser.address)
      formData.append('address', `${address}`);
    if (image) {
      formData.append('img', image);
    }

    UserService.changeUserInfo(Number(userId.id), formData)
      .then((data) => {
        console.log(data);
        navigate(-1);
      })
      .catch((e) => alert(e));
  }, [name, surname, height, weight, sex, address, image, currentUser, navigate, userId.id]);

  return (
    <>
      <div className={classes.fieldsContainer}>
        {imagePreview.length ? (
          <div className={classes.avatarContainer}>
            <img
              className={classes.avatar}
              src={imagePreview}
              alt={name}
            />
            <Button
              variant="outlined"
              component="label"
              className={classes.uploadImageButton}
            >
              Upload image
              <input
                id="image"
                type="file"
                hidden
                accept=".jpg, .jpeg, .png"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files) {
                    setImage(e.target.files[0]);
                    setImagePreview(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />
            </Button>
          </div>
        ) : null}
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
          required
        ></TextField>
        <TextField
          id="surname"
          label="Surname"
          variant="outlined"
          value={surname}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSurname(e.target.value);
          }}
          required
        ></TextField>
        <TextField
          id="height"
          label="Height"
          variant="outlined"
          type="number"
          value={height}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setHeight(+e.target.value);
          }}
          required
        ></TextField>
        <TextField
          id="weight"
          label="Weight"
          variant="outlined"
          type="number"
          value={weight}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setWeight(+e.target.value);
          }}
          required
        ></TextField>
        <TextField
          select
          id="sex"
          label="Sex"
          defaultValue={sexValues[0].value}
          value={sex}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSex(e.target.value);
          }}
          required
        >
          {sexValues.map((elem) => (
            <MenuItem key={elem.value} value={elem.value}>
              {elem.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="address"
          label="Address"
          variant="outlined"
          helperText="Example: 27 Beruta St., Apt 64, Minsk, Belarus"
          value={address}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setAddress(e.target.value);
          }}
          required
        ></TextField>
        <Button variant="outlined" color="success" onClick={changeUserInfo}>
          Update user info
        </Button>
      </div>
    </>
  );
};

export default ChangeUserInfo;
