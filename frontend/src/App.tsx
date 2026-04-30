import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Listing from './routes/Listing';
import Form from './routes/Form';
import Header from './components/Header';



const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Listing />,
      },
      {
        path: "form/:movieId",
        element: <Form />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
