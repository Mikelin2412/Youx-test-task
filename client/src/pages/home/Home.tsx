import React from 'react';
import { Container, Stack } from '@mui/material';
import classes from './style.module.css';
import UserCard from '../../components/user-card/UserCard';
import { User } from '../../utils/interfaces';

const Home: React.FC = () => {
  const mockUsers: User[] = [
    {
      name: 'Misha',
      surname: 'Belyachevsky',
      height: 175,
      weight: 70,
      sex: 'male',
      address: 'Anyone street',
      image: 'image path',
    },
    {
      name: 'Dasha',
      surname: 'Machiho',
      height: 160,
      weight: 50,
      sex: 'female',
      address: 'Anyone street',
      image: 'image path',
    },
  ];

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Stack spacing={2}>
        {mockUsers?.map((user) => (
          <UserCard
            name={user.name}
            surname={user.surname}
            height={user.height}
            weight={user.weight}
            sex={user.sex}
            address={user.address}
            image={user.image}
          />
        ))}
      </Stack>
    </Container>
  );
};

export default Home;
