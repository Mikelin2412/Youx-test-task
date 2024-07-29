import React from 'react';
import { Container, Stack } from '@mui/material';
import classes from './style.module.css';
import UserCard from '../../components/user-card/UserCard';

const Home: React.FC = () => {
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Stack spacing={2}>
        <UserCard />
      </Stack>
    </Container>
  );
};

export default Home;
