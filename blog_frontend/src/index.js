import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';
import UserPage from './pages/UserPage';
import './index.css';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './modules/index.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PostListPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/write',
    element: <WritePage />,
  },
  {
    path: '/:username',
    children: [
      {
        index: true,
        element: <UserPage />,
      },
      {
        path: ':postId',
        element: <PostPage />,
      },
    ],
  },
]);

const store = createStore(rootReducer, composeWithDevTools());

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
