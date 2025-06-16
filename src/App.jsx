import { useRoutes } from 'react-router-dom';
import { MainPage, Page404, TodoPage } from './pages';
export const ButtonClass = 'px-2 py-2 rounded-xl bg-black text-white  cursor-pointer';
function App() {
  const routes = useRoutes([
    {
      path: '/',
      element: <MainPage />,
    },
    {
      path: 'todos/:id',
      element: <TodoPage />,
    },
    {
      path: '*',
      element: <Page404 />,
    },
  ]);
  return routes;
}

export default App;
