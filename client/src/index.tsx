import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { store } from './store/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout';
import {
  HOME_ROUTE,
  CHANGE_USER_INFO_ROUTE,
  CREATE_NEW_USER_ROUTE,
} from './constants/user-routes';
import Home from './pages/home/Home';
import CreateNewUser from './pages/create-new-user/CreateNewUser';
import ChangeUserInfo from './pages/change-user-info/ChangeUserInfo';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,

    children: [
      {
        path: HOME_ROUTE,
        element: <Home />,
      },
      {
        path: CREATE_NEW_USER_ROUTE,
        element: <CreateNewUser />,
      },
      {
        path: CHANGE_USER_INFO_ROUTE + '/:id',
        element: <ChangeUserInfo />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
