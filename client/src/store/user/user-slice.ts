import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { User } from '../../utils/interfaces';
import type { RootState } from '../store';

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getAllUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const { getAllUsers, deleteUser } = usersSlice.actions;

export const selectAllUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
