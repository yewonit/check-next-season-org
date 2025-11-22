import CheckMyGroupPageForAllNation from './pages/CheckMyGroupPageForAllNationPage';
import CheckMyNewGroupPage from './pages/CheckMyNewGroupPage';
import MainPage from './pages/MainPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import EventPage from './pages/EventPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/all-nation-old-group',
    element: <CheckMyGroupPageForAllNation />,
  },
  {
    path: '/new-group-check-my-group',
    element: <CheckMyNewGroupPage />,
  },

  {
    path: '/event',
    element: <EventPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
