import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import HomePage from './kingdom/pages/HomePage';
import AllNationsPage from './kingdom/pages/AllNationsPage';
import BuildPage from './kingdom/pages/BuildPage';
import ResultPage from './kingdom/pages/ResultPage';

/**
 * 2027 시즌 (Kingdom Builders)
 * 2026 시즌 화면은 태그 season-2026 / 브랜치 archive/season-2026 에 보관되어 있다.
 */
const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/all-nations', element: <AllNationsPage /> },
  { path: '/build', element: <BuildPage /> },
  { path: '/result', element: <ResultPage /> },
  { path: '*', element: <Navigate to="/" replace /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
