import React, { useState, useEffect, useCallback } from 'react';
import { Container, Pagination, Stack } from '@mui/material';
import classes from './style.module.css';
import UserCard from '../../components/user-card/UserCard';
import { UserService } from '../../services/user.service';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteUser, getAllUsers, selectAllUsers } from '../../store/user/user-slice';

const Home: React.FC = () => {
  const limit = 5;
  const dispatch = useAppDispatch();
  const allUsers = useAppSelector(selectAllUsers);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = useCallback(async () => {
    try {
      const data = await UserService.getAllUsersFromAPI(currentPage, limit);
      dispatch(getAllUsers(data.data));
      setTotalPages(Math.ceil(data.meta.total / limit));
    } catch (e) {
      console.error('Failed to fetch users:', e);
    }
  }, [currentPage, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const changePage = useCallback(
    (_: React.ChangeEvent<unknown>, page: number) => {
      setCurrentPage(page);
    },
    [],
  );

  const deleteUserById = useCallback(
    async (id: number) => {
      try {
        await UserService.deleteUserById(id);
        dispatch(deleteUser(id));
        fetchData();
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    },
    [dispatch, fetchData],
  );

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Stack spacing={2} className={classes.usersList}>
        {allUsers.users.map((user) => (
          <UserCard
            key={user.id}
            id={user.id}
            name={user.name}
            surname={user.surname}
            height={user.height}
            weight={user.weight}
            sex={user.sex}
            address={user.address}
            image={user.image}
            deleteFunction={() => deleteUserById(user.id)}
          />
        ))}
      </Stack>
      <Pagination
        count={totalPages}
        variant="outlined"
        color="primary"
        onChange={changePage}
      ></Pagination>
    </Container>
  );
};

export default Home;
