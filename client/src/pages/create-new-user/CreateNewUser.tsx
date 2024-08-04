import { Button, MenuItem, TextField } from '@mui/material';
import React, { useState } from 'react';
import { UserService } from '../../services/user.service';
import { useNavigate } from 'react-router-dom';
import classes from './style.module.css';
import { sexValues } from '../../constants/constants';

const CreateNewUser: React.FC = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [sex, setSex] = useState(sexValues[0].value);
  const [address, setAddress] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const createNewUser = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('height', `${height}`);
    formData.append('weight', `${weight}`);
    formData.append('sex', `${sex}`);
    formData.append('address', `${address}`);
    if (image) {
      formData.append('img', image);
    }

    UserService.createNewUser(formData)
      .then((data) => {
        console.log(data);
        navigate(-1);
      })
      .catch((e) => console.log(e));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      const previewUrl = URL.createObjectURL(e.target.files[0]);
      setImagePreview(previewUrl);
      console.log('Image selected:', e.target.files[0]);
      console.log('Preview URL:', previewUrl);
    }
  };

  return (
    <>
      <div className={classes.fieldsContainer}>
        <div className={classes.avatarContainer}>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className={classes.imagePreview}
            />
          )}
          <div>
            <Button variant="outlined" component="label">
              Upload image
              <input
                id="image"
                type="file"
                hidden
                accept=".jpg, .jpeg, .png"
                onChange={handleImageChange}
              />
            </Button>
          </div>
        </div>
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
          inputProps={{ min: 0, step: 1 }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = Math.max(0, +e.target.value);
            setHeight(value);
          }}
          required
        ></TextField>
        <TextField
          id="weight"
          label="Weight"
          variant="outlined"
          type="number"
          value={weight}
          inputProps={{ min: 0, step: 1 }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = Math.max(0, +e.target.value);
            setWeight(value);
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
        <Button variant="outlined" onClick={createNewUser}>
          Create new user
        </Button>
      </div>
    </>
  );
};

export default CreateNewUser;
